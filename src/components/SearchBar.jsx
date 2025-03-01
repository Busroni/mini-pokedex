import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=1304`)
        .then((res) => {
          const filteredResults = res.data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filteredResults.slice(0, 5)); // Ambil 10 saran teratas
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="relative w-72">
      {/* Input Search */}
      <input
        type="text"
        id="search-navbar"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Pokémon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Loader */}
      {loading && <p className="absolute right-2 top-2 text-sm text-gray-500">Loading...</p>}

      {/* Dropdown Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-slate-400 text-white border  rounded-lg shadow-lg mt-1 z-10">
          {suggestions.map((pokemon, index) => (
            <li
              key={index}
              className="p-2 hover:bg-orange-600 hover:text-white hover:rounded-lg cursor-pointer"
              onClick={() => {
                setQuery(pokemon.name);
                window.location.href = `/Pokemon/${pokemon.name}`; // Redirect otomatis
              }}
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
