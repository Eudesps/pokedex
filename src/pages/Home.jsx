import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Container, Grid } from '@mui/material'; // Correção: usar `Grid` ao invés de `Grid2`

export const Home = () => {
  const [pokemons, setPokemons] = useState([]); // Mantém a lista original
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Lista para exibição

  useEffect(() => {
    getPokemons();
  }, []); // Rodar apenas uma vez

  const getPokemons = async () => {
    let endpoints = [];
    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
    
    setPokemons(responses); // Guarda a lista original
    setFilteredPokemons(responses); // Inicializa a lista filtrada com todos os Pokémons
  };

  const pokemonFilter = (name) => {
    if (!name) {
      setFilteredPokemons(pokemons); // Se o campo estiver vazio, restaurar lista original
      return;
    }

    const filtered = pokemons.filter(pokemon =>
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
            <Grid item xs={2} sm={6} md={2} key={key}>
              <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default}types={pokemon.data.types} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
