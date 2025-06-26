import estilos from "../estilos/FilterBar.module.css";

function FilterBar({ setSearch, setFilterType }) {
  return (
    <div className={estilos.filterContainer}>
      {/* input para buscar pokemon pelo nome */}
      <input
        type="text"
        placeholder="Buscar por nome"
        onChange={(e) => setSearch(e.target.value)}
        className={estilos.input}
      />
      {/* select para filtrar por tipo de Pokémon */}
      <select
        onChange={(e) => setFilterType(e.target.value)}
        className={estilos.select}
      >
        <option value="">Todos os tipos</option>
        {/* tipos de pokemon */}
        <option value="fire">🔥 Fogo</option>
        <option value="water">💧 Água</option>
        <option value="grass">🌿 Planta</option>
        <option value="electric">⚡ Elétrico</option>
        <option value="bug">🐞 Inseto</option>
        <option value="normal">⚪ Normal</option>
      </select>
    </div>
  );
}

export default FilterBar;
