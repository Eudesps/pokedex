import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function PokemonCard({ name, image, types }) {

  const typeHandler = () => {
    if(types[1]){
      return types[0].type.name + " " + types[1].type.name;
    }
    else{
      return types[0].type.name;
    }
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia
        sx={{ height: 200 }} // Mantém altura fixa para evitar esticamento
        image={image}
        title="Pokemon"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {typeHandler()}
        </Typography>
        {/* 
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> 
        */}
      </CardContent>
      {/* 
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
      */}
    </Card>
  );
}
