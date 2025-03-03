import React, { useEffect, useState } from "react";
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
      <h1 className="text-4xl font-bold text-orange-300 mb-2">Stat Pokemon</h1>
      <p className="mb-2 text-amber-500  text-2xl font-bold font-mono">
          Base Experience: {pokemon.base_experience}
        </p>
        <div>
          {pokemon.types.map((item, index) => (
            <span
              key={index}
              className={`text-white rounded-lg px-3 py-1 mr-2 ${getColor(item.type.name)}`}
            >
              {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
            </span>
          ))}
        </div>
        <div>
          {pokemon.stats.map((item, index) => (
              <p key={index}>
                {item.stat.name.charAt(0).toUpperCase() + item.stat.name.slice(1)} : {item.base_stat}
              </p>
            ))}
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Height: {pokemon.height*10} CM | Weight: {pokemon.weight*0.1} KG
        </p>
    </div>
    </div>
  );
};

export default Detail;