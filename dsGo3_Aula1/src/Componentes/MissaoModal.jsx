import { useState } from "react";
import sucesso from "../assets/win.png";
import erro from "../assets/erro.png";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null); // mensagem texto
  const [status, setStatus] = useState(null); // "sucesso" | "erro"

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // chama onConcluir após 1s
      setTimeout(() => {
        onConcluir(missao.id);
        setResultado(null); // limpa mensagem
        setStatus(null); // limpa status
        setResposta(""); // limpa input
      }, 1000);
    } else {
      // resposta incorreta
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
      // mantém a imagem de erro até o usuário digitar novamente
    }
  };

  return (
    <dialog
      open
      className="modal"
      aria-labelledby="titulo-missao"
      aria-describedby="descricao-missao"
      role="dialog"
    >
      <h2 className="titulo" id="titulo-missao">
        {missao.titulo}
      </h2>

      <p id="descricao-missao">{missao.descricao}</p>

      <label htmlFor="resposta" className="sr-only">
        Digite sua resposta
      </label>
      <input
        className="caixaTexto"
        id="resposta"
        type="text"
        placeholder="Digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        required
        aria-required="true"
      />

      <div className="modal-botoes">
        <button onClick={verificarResposta} aria-label="Enviar resposta da missão">
          Enviar
        </button>
        <button onClick={onClose} aria-label="Fechar janela da missão">
          Fechar
        </button>
      </div>

      {/* feedback visual */}
      {resultado && (
        <div className="resultado" role="alert">
          <p>{resultado}</p>

          {status === "sucesso" && (
            <img
              src={sucesso}
              alt="Missão concluída com sucesso"
              width="100"
              loading="lazy"
            />
          )}

          {status === "erro" && (
            <img
              src={erro}
              alt="Erro na resposta da missão"
              width="100"
              loading="lazy"
            />
          )}
        </div>
      )}
    </dialog>
  );
}
