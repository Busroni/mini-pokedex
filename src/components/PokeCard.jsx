import React, { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../services/api";
import { getColor } from "../services/data";

const PokeCard = ({ pokemonId }) => {
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
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5 
    hover:bg-slate-900 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out hover:border-orange-600 relative">
      <div className="absolute text-center text-8xl text-slate-400 font-mono font-black w-full h-full flex   opacity-20 z-0 top-0.5">
        #{pokemon.id}
      </div>
      <a href={`/pokemon/${pokemon.name}`} className="relative">
      
      <img
        className="rounded-t-lg w-full hover:opacity-90 transition-all duration-300 ease-in-out"
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
      />
      
      </a>
      <p className="mb-2 text-white">  
        {pokemon.types.map((item, index) => (
                    <span
                      key={index}
                      className={`text-white rounded-lg px-3 text-xs md:text-l py-1 mr-2 ${getColor(item.type.name)}`}
                    >
                      {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
                    </span>
                  ))}
      </p>
      <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {pokemon.name.toUpperCase()}
      </h5>
      
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Base Experience: {pokemon.base_experience}
      </p>
      <a
        href={`/pokemon/${pokemon.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

export default PokeCard;
