import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  cursor: "pointer",
  textAlign: "center",
  padding: 16,
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    backgroundColor: "#AAE3DA", // Cor mais fraca do Bulbasaur
    borderRadius: "10px",
  },
});

const PokemonCard = ({ name, image, types, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <img src={image} alt={name} style={{ width: "100px", height: "100px" }} />
      <CardContent>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>{name.toUpperCase()}</Typography>
        <Typography variant="body2">Tipo: {types.map(t => t.type.name).join(", ")}</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default PokemonCard;