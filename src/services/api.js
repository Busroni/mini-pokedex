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
export const fetchPokemonSpecies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    throw error;
  }
};

export const typeColor = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-indigo-700",
  dragon: "bg-purple-700",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export const getColor = (type) => typeColor[type]
