import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  height: '2.5em', // Ajusta a altura da barra de pesquisa
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '10ch', // Ajusta a largura inicial
      '&:focus': {
        width: '18ch', // Ajusta a largura ao focar
      },
    },
  },
}));

export default function Navbar({ pokemonFilter }) {
  return (
    <>
      {/* Adiciona espaço extra para evitar que o conteúdo fique escondido atrás da Navbar fixa */}
      <Box sx={{ paddingTop: '4.5em' }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: "rgba(69, 69, 69, 0.9)", // Transparente
            backdropFilter: "blur(10px)", // Efeito de vidro desfocado
            boxShadow: "none" // Remove a sombra para um design mais clean
          }}
        >
          <Toolbar>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%">
              <Box component="img" src="/assets/pokemon-logo.png" height="4em" sx={{ marginRight: 2 }} />
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Pesquisar"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => pokemonFilter(e.target.value)}
                />
              </Search>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
