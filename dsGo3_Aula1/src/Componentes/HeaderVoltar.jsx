import { useNavigate } from "react-router-dom";

export function HeaderVoltar({ titulo }) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.6rem 1.2rem",
        background: "rgba(102, 80, 201, 0.25)", // lilás translúcido
        backdropFilter: "blur(8px)", // efeito vidro fosco
        color: "#f0ebeb",
        borderBottom: "1px solid rgba(183, 164, 255, 0.3)",
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent",
          border: "none",
          color: "#f0ebeb",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "0.95rem",
          fontWeight: "500",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        ← Voltar
      </button>

      {titulo && (
        <h2
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "600",
            margin: 0,
            color: "#eae6ff",
            letterSpacing: "0.5px",
          }}
        >
          {titulo}
        </h2>
      )}

      {/* espaço para alinhar o botão voltar e centralizar o título */}
      <div style={{ width: "60px" }} />
    </header>
  );
}
