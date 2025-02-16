import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const PokemonModal = ({ open, handleClose, pokemon }) => {
  if (!pokemon) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{pokemon.name.toUpperCase()}</DialogTitle>
      <DialogContent>
        <img
          src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
          alt={pokemon.name}
          style={{ width: "150px", height: "150px" }}
        />
        <Typography variant="body1">Tipo: {pokemon.types.map(t => t.type.name).join(", ")}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PokemonModal;
