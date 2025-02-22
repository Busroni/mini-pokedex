import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

// Fungsi untuk mengambil daftar Pokémon dengan paginasi
export const fetchPokemons = async (offset = 0, limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-form`, {
      params: { offset, limit },
    });
    return response.data; // Mengembalikan data hasil API
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
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

// Fungsi untuk mengambil spesies Pokémon
export const fetchPokemonSpecies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    throw error;
  }
};
