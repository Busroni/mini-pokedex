import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

// Fungsi untuk mengambil daftar Pokémon dengan paginasi
export const fetchPokemons = async (offset = 0, limit = 40) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: { offset, limit },
    });
    console.log(response.data)
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
export const fetchPokemonSpecies = async (pokemonIdOrName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species/${pokemonIdOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon species for ${pokemonIdOrName}:`, error);
    throw error;
  }
};

export const getEvolution = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log("Evolution Error:", error);
  }
};

const getEvolutionImage = async (name) => {
  const detail = await fetchPokemonDetail(name);
  return detail.sprites.other["official-artwork"].front_default;
};
