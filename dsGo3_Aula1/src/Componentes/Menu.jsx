import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import bau from '../assets/bau_tratado.png';
import camera from '../assets/camera_tratado.png';
import { Link } from 'react-router-dom';

export function Menu() {
    return (
        // container do menu
        <nav className='menu' aria-label="Menu principal de navegação">
            {/* usando ul corretamente e mantendo sua estrutura */}
            <ul role="menu">
                
                {/* adicionei role e aria pra acessibilidade */}
                <Link to="missao" role="menuitem" aria-label="Ir para Missões">
                    <li tabIndex="0">
                        <figure>
                            <img src={missao} alt="Missões" loading="lazy" />
                            <figcaption>Missões</figcaption>
                        </figure>
                    </li>
                </Link>

                <Link to="inventario" role="menuitem" aria-label="Ir para Inventário">
                    <li tabIndex="0">
                        <figure>
                            <img src={bau} alt="Inventário" loading="lazy" />
                            <figcaption>Inventário</figcaption>
                        </figure>
                    </li>
                </Link>

                <Link to="mapa" role="menuitem" aria-label="Ir para GeoLocalização">
                    <li tabIndex="0">
                        <figure>
                            <img src={mapa} alt="GeoLocalização" loading="lazy" />
                            <figcaption>GeoLocalização</figcaption>
                        </figure>
                    </li>
                </Link>

                <Link to="camera" role="menuitem" aria-label="Ir para câmera">
                    <li tabIndex="0">
                        <figure>
                            <img src={camera} alt="Camera" loading="lazy" />
                            <figcaption>Câmera</figcaption>
                        </figure>
                    </li>
                </Link>
                
            </ul>
        </nav>
    );
}
