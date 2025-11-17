// src/Paginas/Inventario.jsx
import { useEffect, useState } from "react";
import { HeaderVoltar } from "../Componentes/HeaderVoltar";
import "../Style/_inventario.scss";

// importar figurinhas de feedback
import winImg from "../assets/win.png";
import erroImg from "../assets/erro.png";

export function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [feedback, setFeedback] = useState(null); // null | 'win' | 'erro'

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(dadosSalvos);
  }, []);

  const limparInventario = () => {
    localStorage.removeItem("inventario");
    setInventario([]);
    // mostrar feedback de erro ao limpar (opcional)
    setFeedback("erro");
    setTimeout(() => setFeedback(null), 1500);
  };

  return (
    <div className="inventario-page">
      <HeaderVoltar />

      <div className="inventario-content">
        {/* Título centralizado */}
        <h2>Meu Inventário do Miranha 🕷️</h2>

        {/* Botão centralizado */}
        <button className="limpar-btn" onClick={limparInventario}>
          Limpar Inventário
        </button>

        {/* Feedback de vitória/erro */}
        {feedback && (
          <div className="feedback">
            <img
              src={feedback === "win" ? winImg : erroImg}
              alt={feedback}
              style={{ width: "100px", marginTop: "10px" }}
            />
          </div>
        )}

        {/* Lista de figurinhas */}
        {inventario.length === 0 ? (
          <p className="inventario-empty">Nenhuma figurinha no inventário</p>
        ) : (
          <div className="inventario-grid">
            {inventario.map((f) => (
              <div key={f.id} className="inventario-card">
                <img src={f.img} alt={f.nome} />
                <p>{f.nome}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
