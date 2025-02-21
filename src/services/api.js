import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonSpecies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species`);
    return response.data; // Axios langsung return data tanpa perlu `.json()`
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// Fungsi untuk mengambil detail Pokémon berdasarkan ID atau nama
export const fetchPokemonDetail = async (pokemonIdOrName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${pokemonIdOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon detail for ${pokemonIdOrName}:`, error);
    throw error;
  }
};