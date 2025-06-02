import estilo from './Perfil.module.css';

export function Perfil() {
    return (
        <div className={estilo.conteiner}>
            <div className={estilo.cartao}>
                <img
                    className={estilo.foto}
                    src="img/perfil.jpeg"
                    alt="Foto de perfil"
                />
                <h2 className={estilo.nome}>Raphaela</h2>
                <p className={estilo.descricao}>Amante de filmes, séries e pipoca 🍿</p>
            </div>
        </div>
    );
}
