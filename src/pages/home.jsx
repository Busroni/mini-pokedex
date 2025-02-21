import { useEffect, useState } from "react";
import { fetchPokemonSpecies } from "../services/api";
import PokeCard from "../components/PokeCard"

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchPokemonSpecies(); // Panggil API
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-2">
      <h1 className="text-5xl font-bold mb-4 p-5 rounded-lg bg-sky-800 text-amber-50">Pokémon Species</h1>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {data.results?.map((pokemon, index) => ( 
          <PokeCard key={index} pokemonId={pokemon.name} />
          ))}     

      </div>
    </div>
  );
};

export default Home;
