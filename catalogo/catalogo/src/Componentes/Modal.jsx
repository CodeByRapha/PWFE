import estilos from './Modal.module.css';

export function Modal({ movie, onClose }) {
    if (!movie) return null;

    return (
        <div className={estilos.modalback}>
            <div className={estilos.modalConteiner}>
                <div className={estilos.modalHeader}>
                    <h2>{movie.title}</h2>
                    <button onClick={onClose} aria-label="Fechar modal">x</button>
                </div>  
                <div className={estilos.imgDetails}>
                    <img
                        className={estilos.imgModal}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <ul className={estilos.movieDetails}>
                        <li><strong>Popularidade:</strong> {movie.popularity ?? 'Não disponível'}</li>
                        <li><strong>Data de Lançamento:</strong> {movie.release_date}</li>
                        <li><strong>Quantidade de Votos:</strong> {movie.vote_count}</li>
                        <li><strong>Sinopse:</strong> {movie.overview}</li>
                    </ul>
                </div>              
            </div>
        </div>
    );
}
