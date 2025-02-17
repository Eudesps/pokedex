import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Cores correspondentes a cada tipo de Pokémon
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
  fairy: "#D685AD",
};

// Estilo do Card
const StyledCard = styled(Card)({
  cursor: "pointer",
  textAlign: "center",
  padding: 16,
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    backgroundColor: "#AAE3DA",
    borderRadius: "10px",
  },
});

// Estilo do Tipo
const TypeBadge = styled("span")(({ type }) => ({
  display: "inline-block",
  padding: "4px 8px",
  margin: "4px 2px",
  borderRadius: "8px",
  backgroundColor: typeColors[type] || "#A8A77A",
  color: "white",
  fontWeight: "bold",
  fontSize: "12px",
  textTransform: "uppercase",
}));

const PokemonCard = ({ name, image, types, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <img src={image} alt={name} style={{ width: "100px", height: "100px" }} />
      <CardContent>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {name.toUpperCase()}
        </Typography>
        <Typography variant="body2">
          {types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name}>
              {t.type.name}
            </TypeBadge>
          ))}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default PokemonCard;