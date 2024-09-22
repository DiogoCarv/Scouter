import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './App.css';
import logoVerde from './imagens/logo_verde.png';
import RegistrationForm from './components/RegistrationForm';
import Login from './login';
import { Box, Typography, Divider, ButtonBase } from '@mui/material';
import { styled } from '@mui/system';

// Definindo o ImageButton com estilo customizado
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));



const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'black',
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: 'white',
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const images = [
  {
    url: './imagens/logo_verde.png',
    title: 'logoVerde',
    width: '40%', // Ajuste a largura conforme necessário
  },
];

export function InputAdornments() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleRegisterButtonClick = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="App">
      <header className="cabecalho">
        <div className="logo_cabecalho">
          <img src={logoVerde} className="logo_pequena" alt="Logo" />
        </div>
        <div className="botoes_cabecalho">
          {!showLogin && (
            <button className="botao_entrar" onClick={handleLoginButtonClick}>
              LOGIN
            </button>
          )}
          {showLogin && (
            <div className="overlay" onClick={handleCloseLogin}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={handleCloseLogin}>
                  X
                </button>
                <Login />
              </div>
            </div>
          )}
          {!showRegister && (
            <button className="botao_registrar" onClick={handleRegisterButtonClick}>
              REGISTRAR
            </button>
          )}
          {showRegister && (
            <div className="overlay" onClick={handleCloseRegister}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={handleCloseRegister}>
                  X
                </button>
                <RegistrationForm />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="meio">
        <div className="letreiro">
   
          {images.map((image) => (
            <ImageButton key={image.title} style={{ width: image.width }}>
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography component="span" variant="subtitle1" color="inherit" style={{ textAlign: 'center' }}>
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
          
        </div>

        <div className="explicacao">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              color: 'text.secondary',
            }}
          >
            <h1 className="titulo1">Motivo</h1>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className="texto1">Bem-vindo à plataforma onde os cidadãos podem reportar problemas urbanos diretamente para os órgãos competentes.</p>
          </Box>
        </div>
      </main>

      <footer className="rodape">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
            color: 'text.secondary',
          }}
        >
          <p className="direitos_rodape1">SCOUTER® - Marca Registrada</p>
          <p className="direitos_rodape2">Copyright © 2024 | scouter.com | TODOS OS DIREITOS RESERVADOS</p>
        </Box>
      </footer>
    </div>
  );
}

export default App;
