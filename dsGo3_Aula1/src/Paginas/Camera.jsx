import { useRef, useState } from "react";
import { HeaderVoltar } from "../Componentes/HeaderVoltar";

export function Camera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const abrirCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = s;
      setStream(s);
    } catch (err) {
      alert("Erro ao acessar a câmera: " + err.message);
    }
  };

  const fecharCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
        backgroundImage: "url('/assets/fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Header fixo e translúcido */}
      <HeaderVoltar />

      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          
          zIndex: 0,
        }}
      ></div>

      {/* Conteúdo */}
      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        <h2
          style={{
            marginBottom: "1rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#eae6ff",
            textShadow: "0 2px 6px rgba(0,0,0,0.4)",
          }}
        >
          📸 Câmera
        </h2>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "90%",
            maxWidth: "400px",
            borderRadius: "12px",
            border: "2px solid rgba(255,255,255,0.25)",
            marginTop: "1rem",
            backgroundColor: "#000",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />

        <div style={{ marginTop: "1rem" }}>
          {!stream ? (
            <button onClick={abrirCamera}>Abrir Câmera</button>
          ) : (
            <button onClick={fecharCamera}>Fechar Câmera</button>
          )}
        </div>
      </div>
    </div>
  );
}
