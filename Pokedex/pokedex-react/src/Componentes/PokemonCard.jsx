import estilos from "../estilos/PokemonCard.module.css";

function PokemonCard({ pokemon }) {
  //  traduzindo os tipos do inglês para o português
  const tipoTraduzido = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terra",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Rocha",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada",
  };

  return (
    <div className={estilos.card}>
      {/* imagem do pokemon */}
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className={estilos.pokemonIMG}
      />
      {/* nome pokemon */}
      <h2 className={estilos.pokemonNome}>{pokemon.name}</h2>

      {/* lista de tipos do pokemon, com tradução e estilo */}
      <div className={estilos.tipos}>
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`${estilos.type} ${estilos[t.type.name]}`}
          >
            {tipoTraduzido[t.type.name] || t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
