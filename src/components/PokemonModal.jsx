import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress, LinearProgress, Card, CardContent } from "@mui/material";
import axios from "axios";

const PokemonModal = ({ open, handleClose, pokemon }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    if (pokemon) {
      fetchEvolution(pokemon.species.url);
    }
  }, [pokemon]);

  const fetchEvolution = async (speciesUrl) => {
    try {
      const speciesResponse = await axios.get(speciesUrl);
      const evolutionUrl = speciesResponse.data.evolution_chain.url;
      const evolutionResponse = await axios.get(evolutionUrl);
      processEvolutionChain(evolutionResponse.data.chain);
    } catch (error) {
      console.error("Erro ao buscar evolução:", error);
    }
  };

  const processEvolutionChain = async (chain) => {
    let evoList = [];
    let current = chain;

    while (current) {
      const name = current.species.name;
      const imageUrl = await fetchPokemonImage(name);

      evoList.push({ name, image: imageUrl });
      current = current.evolves_to.length ? current.evolves_to[0] : null;
    }

    setEvolutionChain(evoList);
  };

  const fetchPokemonImage = async (name) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return response.data.sprites.other["official-artwork"].front_default;
    } catch (error) {
      console.error(`Erro ao buscar imagem de ${name}:`, error);
      return "";
    }
  };

  if (!pokemon) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
        {pokemon.name.toUpperCase()}
      </DialogTitle>
      <Typography variant="subtitle1" style={{ textAlign: "center", fontStyle: "italic" }}>
        Atributos e Estatísticas
      </Typography>
      
      {/* Atributos */}
      <DialogContent>
        <Card variant="outlined" style={{ padding: "10px", borderRadius: "10px", textAlign: "center" }}>
          <CardContent>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>Altura</Typography>
            <Typography variant="body2" style={{ marginBottom: "8px" }}>{pokemon.height * 10} cm</Typography>
            
            <Typography variant="body1" style={{ fontWeight: "bold" }}>Peso</Typography>
            <Typography variant="body2" style={{ marginBottom: "8px" }}>{pokemon.weight / 10} kg</Typography>
            
            <Typography variant="body1" style={{ fontWeight: "bold" }}>Habilidades</Typography>
            <Typography variant="body2">{pokemon.abilities.map((a) => a.ability.name).join(", ")}</Typography>
          </CardContent>
        </Card>
      </DialogContent>
      
      <DialogContent style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around", gap: "20px" }}>
        {/* Pokémon Principal e Evolução */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
            alt={pokemon.name}
            style={{ width: "150px", height: "150px" }}
          />
          <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>Evolução</Typography>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginTop: "10px" }}>
            {evolutionChain.length > 0 ? (
              evolutionChain.map((evo, index) => (
                <React.Fragment key={index}>
                  <img src={evo.image} alt={evo.name} style={{ width: "50px", height: "50px" }} />
                  {index < evolutionChain.length - 1 && <Typography variant="h5">➝</Typography>}
                </React.Fragment>
              ))
            ) : (
              <CircularProgress size={24} style={{ marginTop: "10px" }} />
            )}
          </div>
        </div>

        {/* Estatísticas de Batalha */}
        <div style={{ width: "50%" }}>
          <Typography variant="h6" style={{ fontWeight: "bold", textAlign: "center" }}>
            Estatísticas de Batalha
          </Typography>
          {pokemon.stats.map((stat, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <Typography variant="body2" style={{fontWeight: "bold" }}>{stat.stat.name.toUpperCase()}</Typography>
              <LinearProgress variant="determinate" value={(stat.base_stat / 150) * 100} style={{height: "10px", borderRadius: "5px" }} />
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }}>
      </DialogActions>
    </Dialog>
  );
};

export default PokemonModal;