import { useEffect, useState } from "react";
import PokemonCard from "../Componentes/PokemonCard";
import FilterBar from "../Componentes/FilterBar";

import estilos from "../estilos/Pokedex.module.css";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]); // lista completa dos pokemons com detalhes
  const [search, setSearch] = useState(""); // texto do filtro por nome
  const [filterType, setFilterType] = useState(""); // filtro por tipo

  useEffect(() => {
    async function fetchData() {
      // busca lista dos 151 pokemons
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();

      // busca os detalhes completos de cada pokemon em paralelo
      const details = await Promise.all(
        data.results.map((p) => fetch(p.url).then((res) => res.json()))
      );

      setPokemons(details);
    }

    fetchData();
  }, []);

  // filtra os pokemons pelo nome e tipo conforme o que o usuário digitou e escolheu
  const filtered = pokemons.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || p.types.some((t) => t.type.name === filterType))
  );

  return (
    <div className={estilos.container}>
      <h1 className={estilos.title}>PokeMange</h1>
      {/* barra de filtro controlada pelos estados */}
      <FilterBar setSearch={setSearch} setFilterType={setFilterType} />
      {/* grid de cards */}
      <div className={estilos.grid}>
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
