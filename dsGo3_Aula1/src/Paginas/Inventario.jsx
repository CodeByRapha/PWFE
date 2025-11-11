import { useState } from "react";
import { figurinhas as todasFigurinhas } from "../Dados/figurinhas";
import { HeaderVoltar } from "../Componentes/HeaderVoltar"; 

export function Inventario() {
  const [inventario, setInventario] = useState([]);

  const adicionarFigurinha = (id) => {
    const figurinha = todasFigurinhas.find((f) => f.id === id);
    if (figurinha) setInventario([...inventario, figurinha]);
  };

  const limparInventario = () => setInventario([]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
        backgroundImage: "url('/assets/fundo-inventario.jpg')",
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
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      ></div>

      {/* Conteúdo */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#eae6ff",
            textShadow: "0 2px 6px rgba(0,0,0,0.4)",
          }}
        >
          Meu Inventário do Miranha 🕷️
        </h2>

        {/* Botões */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.6rem",
            marginBottom: "1.5rem",
          }}
        >
          <button onClick={() => adicionarFigurinha(1)}>
            Adicionar Mini Miranha
          </button>
          <button onClick={() => adicionarFigurinha(2)}>
            Adicionar Miranha Travesso
          </button>
          <button onClick={() => adicionarFigurinha(3)}>
            Adicionar Homem-Aranha
          </button>
          <button onClick={limparInventario}>Limpar Inventário</button>
        </div>

        {/* Grid das figurinhas */}
        {inventario.length === 0 ? (
          <p style={{ color: "#ccc" }}>Nenhuma figurinha no inventário</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "0.8rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              justifyItems: "center",
              alignItems: "center",
              marginTop: "10px",
              padding: "0 1rem",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {inventario.map((f, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  padding: "0.6rem",
                  color: "#fff",
                  width: "110px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
              >
                <img
                  src={f.img}
                  alt={f.nome}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    marginBottom: "0.3rem",
                    borderRadius: "8px",
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    color: "#eae6ff",
                  }}
                >
                  {f.nome}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
