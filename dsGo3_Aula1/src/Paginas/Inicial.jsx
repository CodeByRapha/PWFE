import miranha from '../assets/miranha.jpg';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
  const navigate = useNavigate();

  return (
    <main className="inicial" role="main" aria-label="Tela inicial do jogo">
      
      {/* img do fundo */}
      <img 
        src={miranha} 
        className="miranha" 
        alt="Homem-Aranha" 
      />

      {/* botão de entrar com aria-label para leitores de tela */}
      <button 
        onClick={() => navigate('/dspider')} 
        className="entrar" 
        type="button"  
        aria-label="Entrar no sistema e iniciar experiência"
      >
        Entrar
      </button>

    </main>
  );
}
