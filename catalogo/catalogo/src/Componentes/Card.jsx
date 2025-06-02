import estilos from './Card.module.css';

export function Card({ movie, onOpenModal }) {
    return (
        <div className={estilos.conteiner} onClick={() => onOpenModal(movie)}>
            <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={estilos.poster}
            />
            <div className={estilos.info}>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
}
