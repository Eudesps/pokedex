import React, { useEffect, useState } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Typography, 
  CircularProgress, LinearProgress, Card, CardContent 
} from "@mui/material";
import { alpha } from "@mui/material/styles"; // Importando corretamente o alpha
import axios from "axios";

// Mapeamento de cores para cada tipo de Pokémon
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

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

  // Pega a cor correspondente ao primeiro tipo do Pokémon
  const primaryType = pokemon.types[0].type.name;
  const primaryColor = typeColors[primaryType] || "#A8A77A"; // Cor padrão se o tipo não for encontrado
  const lighterColor = alpha(primaryColor, 0.3); // Cor mais suave para o fundo

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
        {pokemon.name.toUpperCase()}
      </DialogTitle>
      <Typography variant="subtitle1" style={{ textAlign: "center", fontStyle: "italic", fontWeight: "bold" }}>
        Atributos
      </Typography>
      
      {/* Atributos */}
      <DialogContent>
        <Card variant="outlined" style={{ 
          padding: "10px", 
          borderRadius: "10px", 
          textAlign: "center", 
          backgroundColor: lighterColor // Aplicando a cor suave baseada no tipo
        }}>
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
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {stat.stat.name.toUpperCase()}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(stat.base_stat / 150) * 100}
                sx={{
                  height: "10px",
                  borderRadius: "5px",
                  backgroundColor: alpha(primaryColor, 0.3), // Cor de fundo da barra (transparente)
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: primaryColor, // Cor principal da barra
                  },
                }}
              />
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }} />
    </Dialog>
  );
};

export default PokemonModal;
