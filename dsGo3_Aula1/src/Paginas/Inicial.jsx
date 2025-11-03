import miranha from '../assets/miranha.jpg';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
    const navigate =useNavigate();

  return (
    <main className="inicial">
      <img src={miranha} className="miranha" alt="fundo miranha" />
  
      <button onClick={() => navigate('/dsgo')} className="entrar">
       Entrar
      </button>
    </main>
  );
}
