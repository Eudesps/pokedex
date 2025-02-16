import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const PokemonCard = ({ name, image, types, onClick }) => {
  return (
    <Card onClick={onClick} sx={{ cursor: "pointer", textAlign: "center", padding: 2 }}>
      <img src={image} alt={name} style={{ width: "100px", height: "100px" }} />
      <CardContent>
        <Typography variant="h6">{name.toUpperCase()}</Typography>
        <Typography variant="body2">Tipo: {types.map(t => t.type.name).join(", ")}</Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
