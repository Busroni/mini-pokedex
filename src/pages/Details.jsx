import Detail from "../components/Detail";
import PokemonSpecies from "../components/PokemonSpecies";
import { useParams } from "react-router-dom";

const Details = () => {
    const { name } = useParams(); // Menangkap nama dari URL
  
    return (
      <div>
        <h1 className="text-5xl font-extrabold mb-5 text-orange-600 uppercase">{name}</h1>
        <Detail pokemonId={name}/>
        <PokemonSpecies pokemonId={name} />
      </div>
    );
  };

export default Details;