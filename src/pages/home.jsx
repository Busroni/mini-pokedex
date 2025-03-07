import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPokemons } from "../services/api";
import PokeCard from "../components/PokeCard";
import PokePaging from "../components/PokePaging";

function withLocation(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    const navigate = useNavigate();
    return <Component {...props} location={location} navigate={navigate} />;
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const page = parseInt(query.get("page")) || 1;
    this.state = {
      data: [],
      count: 0,
      offset: (page - 1) * 40,
      limit: 40,
    };
  }

  componentDidMount() {
    this.getPokemons();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.offset !== this.state.offset || prevProps.location.search !== this.props.location.search) {
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
    const page = newOffset / this.state.limit + 1;
    this.props.navigate(`?page=${page}`);
    this.setState({ offset: newOffset });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <div className="bg-slate-700 p-3 rounded-lg text-center text-white font-extrabold text-3xl uppercase mb-5">
          Pokemon Species
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 hover:cursor-pointer">
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

export default withLocation(Home);
