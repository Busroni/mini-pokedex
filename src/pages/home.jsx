import { useEffect, useState } from "react";
import { fetchPokemonSpecies } from "../services/api";

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
    <div className="p-5">
      <h1 className="text-5xl font-bold mb-4">Pokémon Species</h1>
      <ul>
        {data.results?.map((pokemon, index) => (
          <li key={index} className="mb-2">{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
