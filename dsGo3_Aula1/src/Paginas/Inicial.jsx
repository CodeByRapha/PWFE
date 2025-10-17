import dta from '../assets/dta.jpg';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
    const navigate =useNavigate();

  return (
    <main className="inicial">
      <img src={dta} className="dta" alt="logo dta DS GO" />
  
      <button onClick={() => navigate('/dsgo')} className="entrar">
       Entrar
      </button>
    </main>
  );
}
