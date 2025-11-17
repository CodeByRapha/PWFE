import { useEffect, useState } from "react";

export function MissaoCard({ missao, onIniciarMissao, refresh }) {
  const [concluida, setConcluida] = useState(false);

  useEffect(() => {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    // cada missão tem seu próprio status, não confunda com figurinhaaaa
    const estaConcluida = inventario.some(f => f.missaoId === missao.id);
    setConcluida(estaConcluida);
  }, [refresh, missao.id]);

  return (
    <article className='missao-card' aria-labelledby={missao.id}>
      <h3 id={missao.id}>{missao.titulo}</h3>
      <p>{missao.missao}</p>

      <button
        onClick={() => onIniciarMissao(missao)}
        disabled={concluida}
        aria-disabled={concluida}
      >
        {concluida ? "Missão Concluída" : "Iniciar Missão"}
      </button>
    </article>
  );
}
