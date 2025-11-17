import { useRef, useState, useEffect } from "react";
import { HeaderVoltar } from "../Componentes/HeaderVoltar";
import "../Style/camera.scss";


export function Camera({ onFotoTirada }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [foto, setFoto] = useState(null);
  const [cameraDisponivel, setCameraDisponivel] = useState(true);

  // Função para abrir a câmera
  const abrirCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = s;
      setStream(s);
      setCameraDisponivel(true);
    } catch (err) {
      alert("Erro ao acessar a câmera: " + err.message);
      setCameraDisponivel(false); // Se não tiver câmera
    }
  };

  // Função para fechar a câmera
  const fecharCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  // Função para tirar foto
  const tirarFoto = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imagem = canvas.toDataURL("image/png");
    setFoto(imagem);
    if (onFotoTirada) onFotoTirada(imagem);
    fecharCamera();
  };

  // Reiniciar para tirar nova foto
  const reiniciarFoto = () => {
    setFoto(null);
    abrirCamera();
  };

  // Inicia a câmera ao carregar o componente
  useEffect(() => {
    abrirCamera();
    return () => fecharCamera();
  }, []);

  return (
    <div className="camera-container">
      <HeaderVoltar />

      <div className="camera-overlay"></div>

      <div className="camera-conteudo">
        <h2 className="camera-titulo">📸 Câmera</h2>

        <section className="camera-preview" aria-label="Fluxo da câmera">
          {foto ? (
            <img
              src={foto}
              alt="Foto capturada"
              className="camera-video"
            />
          ) : cameraDisponivel ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-video"
            />
          ) : (
            <div className="camera-placeholder">
              Nenhuma câmera disponível
            </div>
          )}
        </section>

        <div className="camera-botoes">
          {!foto ? (
            <button onClick={tirarFoto} aria-label="Tirar foto">
              Tirar Foto
            </button>
          ) : (
            <button onClick={reiniciarFoto} aria-label="Tirar nova foto">
              Tirar Nova Foto
            </button>
          )}
        </div>

        {/* Canvas oculto para captura de frames */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}
