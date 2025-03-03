import React, { useEffect, useState } from "react";
import { fetchPokemonSpecies, fetchPokemonDetail } from "../services/api";

const PokemonSpecies = ({ pokemonId }) => {
  const [evolution, setEvolution] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [pokemons, setPokemons] = useState(null);
  const [evolutionImages, setEvolutionImages] = useState({});

  useEffect(() => {
    const getPokemonSpecies = async () => {
      try {
        const dataPokemon = await fetchPokemonSpecies(pokemonId);
        if (dataPokemon) {
          setPokemon(dataPokemon);
          const evolutionData = dataPokemon.evolution_chain;
          if (evolutionData) {
            const response = await fetch(evolutionData.url);
            const evoJson = await response.json();
            const chain = getChain(evoJson.chain);
            setEvolution(chain);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    getPokemonSpecies();
  }, [pokemonId]);

  const getChain = (chain) => {
    let evoChain = [];
    let evo = chain;

    while (evo) {
      if (evo.species) {
        evoChain.push(evo.species.name);
      }
      evo = evo.evolves_to[0];
    }

    return evoChain;
  };

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const data = await fetchPokemonDetail(pokemonId);
        setPokemons(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    getPokemonDetail();
  }, [pokemonId]);

  const getEvolutionImage = async (name) => {
    try {
      const detail = await fetchPokemonDetail(name);
      setEvolutionImages((prev) => ({
        ...prev,
        [name]: detail.sprites.other["official-artwork"].front_default,
      }));
    } catch (error) {
      console.error(`Failed to fetch image for ${name}:`, error);
    }
  };

  useEffect(() => {
    if (evolution.length > 0) {
      evolution.forEach((name) => {
        getEvolutionImage(name);
      });
    }
  }, [evolution]);

  if (!pokemon || !pokemons) return <p>Loading...</p>;

  return (
    <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-white p-10">
      <h2 className="text-3xl font-bold">Pokemon Wild Information</h2>
      <p>Base Happiness: {pokemon.base_happiness}</p>
      <p>Capture Rate: {pokemon.capture_rate}</p>

      <h3 className="text-lg font-semibold">Evolution Chain:</h3>

      <div className="items-center text-center grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        {evolution.map((name, index) => (
          <div key={index} className="bg-orange-600 text-white p-2 rounded-lg">
            {name.toUpperCase()}
            {evolutionImages[name] ? (
              <img
                className="rounded-t-lg w-full"
                src={evolutionImages[name]}
                alt={name}
              />
            ) : (
              <p>Loading Image...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonSpecies;
