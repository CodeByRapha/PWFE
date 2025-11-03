import { useState } from "react";
import { figurinhas as todasFigurinhas } from "../Dados/figurinhas";

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
        padding: "2rem",
        color: "#fff",
        textAlign: "center",
        backgroundImage: "url('/caminho/para/sua-imagem.png')", // troque pelo caminho da sua imagem
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.7)", // escurece a imagem
          zIndex: 0,
        }}
      ></div>

      {/* Conteúdo do inventário */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2>Meu Inventário</h2>

        {/* Botões */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          <button onClick={() => adicionarFigurinha(1)}>Adicionar Dragão</button>
          <button onClick={() => adicionarFigurinha(2)}>Adicionar Unicórnio</button>
          <button onClick={() => adicionarFigurinha(3)}>Adicionar Robô</button>
          <button onClick={limparInventario}>Limpar Inventário</button>
        </div>

        {/* Grid das figurinhas */}
        {inventario.length === 0 ? (
          <p style={{ color: "#ccc" }}>Nenhuma figurinha no inventário</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              justifyItems: "center",
              marginTop: "15px",
            }}
          >
            {inventario.map((f, index) => (
              <div
                key={index}
                style={{
                  background: "#444",
                  borderRadius: "12px",
                  padding: "1rem",
                  color: "#fff",
                  maxWidth: "150px",
                  textAlign: "center",
                  boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={f.img}
                  alt={f.nome}
                  style={{ maxWidth: "100px", marginBottom: "0.5rem" }}
                />
                <p style={{ margin: 0, fontWeight: "bold" }}>{f.nome}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
