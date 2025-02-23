import React, { Component } from "react";
import { fetchPokemons } from "../services/api";
import PokeCard from "../components/PokeCard";
import PokePaging from "../components/PokePaging";
import SearchBar from "../components/SearchBar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      count: 0,
      offset: 0,
      limit: 40,
    };
  }

  componentDidMount() {
    this.getPokemons();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.getPokemons();
    }
  }

  getPokemons = async () => {
    try {
      const { offset, limit } = this.state;
      const response = await fetchPokemons(offset, limit);
      this.setState({
        data: response.results,
        count: response.count,
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  setOffset = (newOffset) => {
    this.setState({ offset: newOffset });
  };

  render() {
    return (
      <div>
      <div className="bg-slate-700 p-5 rounded-lg text-center text-white font-black text-2xl mb-5">
        Pokemon Species
      </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {this.state.data.map((pokemon, index) => (
            <PokeCard key={index} pokemonId={pokemon.name} />
          ))}
        </div>

        {/* Pagination Component */}
        <PokePaging
          count={this.state.count}
          offset={this.state.offset}
          limit={this.state.limit}
          setOffset={this.setOffset}
        />
      </div>
    );
  }
}

export default Home;
