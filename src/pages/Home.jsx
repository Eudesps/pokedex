import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import { Container, Grid } from "@mui/material";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]); 
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para o modal

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    let endpoints = [];
    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));

    setPokemons(responses);
    setFilteredPokemons(responses);
  };

  const pokemonFilter = (name) => {
    if (!name) {
      setFilteredPokemons(pokemons);
      return;
    }

    const filtered = pokemons.filter((pokemon) =>
      pokemon.data.name.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredPokemons(filtered);
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />

      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="center">
          {filteredPokemons.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={2} key={key} onClick={() => setSelectedPokemon(pokemon.data)}>
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default} // Imagem estática
                types={pokemon.data.types}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal do Pokémon */}
      <PokemonModal
        open={!!selectedPokemon}
        handleClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />
    </div>
  );
};

export default Home;