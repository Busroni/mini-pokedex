import React, { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../services/api";

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

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className=" grid grid-cols-3 md:grid-cols-4 gap-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5">
      <img
        className="rounded-t-lg w-full"
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
      />
      <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 mx-auto"
        />
        <img
            src={pokemon.sprites.other["official-artwork"].front_shiny}
            alt={pokemon.name}
            className="w-64 mx-auto"
        />
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {pokemon.name.toUpperCase()}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Base Experience: {pokemon.base_experience}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Height: {pokemon.height} | Weight: {pokemon.weight}
      </p>
      
    </div>
  );
};

export default Detail;