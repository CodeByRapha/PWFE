import { useNavigate } from "react-router-dom";
import "../Style/header.scss";

export function HeaderVoltar({ titulo }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button
        onClick={() => navigate("/")}
        className="btn-voltar"
        aria-label="Voltar para a página inicial"
      >
        ← Voltar
      </button>

      {titulo && <h2 className="titulo">{titulo}</h2>}

      <div className="espaco" />
    </header>
  );
}
