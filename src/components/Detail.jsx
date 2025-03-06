import React, { useEffect, useState } from "react";
import EffectDetails from "./EffectDetail";
import { fetchPokemonDetail } from "../services/api";
import { getColor } from "../services/data";


const Detail = ({ pokemonId }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const data = await fetchPokemonDetail(pokemonId);
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    getPokemonDetail();
  }, [pokemonId]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
    <div className="items-center text-center grid grid-cols-1 md:grid-cols-3 gap-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-white p-5">
      <div  className="p-5">
        <img
          className="rounded-t-lg w-full"
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
        />
        <p>Spirites</p>
      </div>
      <div className="p-5">
        <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="rounded-t-lg w-full"
        />
        <p>Official Artwork</p>
      </div>
      <div className="p-5">
        <img
            src={pokemon.sprites.other["official-artwork"].front_shiny}
            alt={pokemon.name}
            className="rounded-t-lg w-full"
        />
        <p>Official Shiny Artwork</p>
      </div>
    </div>
    
    <div className="p-10 bg-slate-700 mt-3 rounded-lg text-white">
      <div className="text-4xl font-bold text-orange-300 mb-2 capitalize">Stat {pokemon.name} 
          {pokemon.types.map((item, index) => (
                <span
                  key={index}
                  className={`text-white text-2xl rounded-lg px-1 py-1 mr-2 ml-2  ${getColor(item.type.name)} md:text-2xl text-sm md:px-3`}
                >
                  {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
                </span>
              ))}
      </div>
      <p className="mb-2 text-amber-300  text-2xl font-bold font-mono">
          Base Experience: {pokemon.base_experience}
      </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
  <div>
    {pokemon.stats.map((item, index) => (
      <div key={index}>
        <div className="flex justify-between mb-1">
          <span className="text-lg font-medium text-blue-700 dark:text-white">{item.stat.name.charAt(0).toUpperCase() + item.stat.name.slice(1)}</span>
          <span className="text-lg font-medium text-blue-700 dark:text-white">{item.base_stat}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-600">
          <div className="bg-lime-300 h-3 rounded-full" style={{ width: `${item.base_stat * 100 / 255}%` }}></div>
        </div>
      </div>
    ))}
  </div>
  <div className="text-gray-700 text-xl dark:text-gray-400 text-center gap-4 justify-center">
    <div>Height<p className="text-6xl text-amber-50 font-bold">{pokemon.height * 10} CM </p></div>
    --- --- ---
    <div>Weight<p className="text-6xl text-amber-50 font-bold">{pokemon.weight * 0.1} KG</p></div>
    
  </div>
  <div>
    <div className="col-span-2 text-2xl font-bold items-center text-center text-orange-100 uppercase">Abilities</div>
  <div className="text-xl font-bold text-center text-blue-100 dark:text-white grid grid-cols-1 md:grid-cols-2 gap-4 p-2 border border-slate-700 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
  <div className="flex space-x-4">
    {pokemon.abilities.map((ability, index) => (
      <div key={index} className="p-4 bg-gray-600 rounded-lg font-medium shadow-md text-white w-64 min-w-[250px]">
        <div className="text-lg font-semibold capitalize mb-2">{ability.ability.name}</div>
        <div className="overflow-y-auto max-h-32 p-2 border border-gray-600 rounded-lg whitespace-normal scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <EffectDetails url={ability.ability.url} />
        </div>
      </div>
    ))}
  </div>
</div>
</div>

</div>

    </div>
    </div>
  );
};

export default Detail;