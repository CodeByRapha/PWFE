import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';
import { HeaderVoltar } from '../Componentes/HeaderVoltar';
import { figurinhas } from "../Dados/figurinhas";
import parabensImg from "../assets/parabens.png";

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const concluirMissao = (missaoId) => {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    // Pegar figurinha 
    const indexFigurinha = inventario.filter(f => f.id <= figurinhas.length).length % figurinhas.length;
    const figurinha = figurinhas[indexFigurinha];

    if (figurinha) {
      // Adiciona apenas uma vez e marca qual missão gerou
      inventario.push({ ...figurinha, missaoId });
    }

    // Verifica se todas as missões foram concluídas
    const todasConcluidas = missoes.every(m =>
      inventario.some(f => f.missaoId === m.id)
    );

    // add a figurinha Parabéns se tds missões forem concluídas
    if (todasConcluidas && !inventario.some(f => f.nome === "Parabéns")) {
      inventario.push({ id: 999, nome: "Parabéns", img: parabensImg });
    }

    // Salva e força refresh imediato
    localStorage.setItem("inventario", JSON.stringify(inventario));
    setRefresh(r => r + 1);

    // Fecha modal
    setMissaoSelecionada(null);
  };

  return (
    <>
      <HeaderVoltar />
      <section className='conteiner' aria-label="Lista de missões disponíveis">
        <h2>Missões</h2>
        <div className="missoes-grid">
          {missoes.map((m) => (
            <MissaoCard
              key={m.id}
              missao={m}
              refresh={refresh}
              onIniciarMissao={setMissaoSelecionada}
            />
          ))}
        </div>

        {missaoSelecionada && (
          <MissaoModal
            missao={missaoSelecionada}
            onClose={() => setMissaoSelecionada(null)}
            onConcluir={() => concluirMissao(missaoSelecionada.id)}
          />
        )}
      </section>
    </>
  );
}
