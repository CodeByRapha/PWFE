import estilos from './BarraNavegacao.module.css';
import { Link } from 'react-router-dom';

export function BarraNavegacao() {
    return (
        <nav className={estilos.conteiner}>
            <ul>
                <li>
                    <Link to="/" className={estilos.link}>
                        <span className="material-symbols-outlined">home</span>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/serie" className={estilos.link}>
                        <span className="material-symbols-outlined">movie</span>
                        Série
                    </Link>
                </li>
                <li>
                    <Link to="/perfil" className={estilos.link}>
                        <span className="material-symbols-outlined">person</span>
                        Perfil
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
