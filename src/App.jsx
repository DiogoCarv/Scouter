//Importações já vindas

import { useState } from 'react'

//-----------------------------------------

// Importações CSS

import './App.css'
import logoVerde from './imagens/logo_verde.png'

//----------------------------------------

// Importações Login e Registrar

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

//----------------------------------------

// Importações do MUI

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

//----------------------------------------

// Const para fazer o botão dentro da imagem

const images = [
  {
    url: './imagens/cidade_verde.jpg',
    title: 'SAIBA MAIS',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
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
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

//----------------------------------------

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

    <div className='App'>

      <div className='cabecalho'>

        <div className='logo_cabecalho'>
          <a href="./App.jsx">
            <img src={logoVerde} className='logo_pequena' alt='Logo' />
          </a>
        </div>

        <div className='botoes_cabecalho'>
          {!showLogin && (
            <button className='botao_entrar' onClick={handleLoginButtonClick}>ENTRAR</button>
          )}
          {showLogin && (
            <div className="overlay" onClick={handleCloseLogin}>
              <div className="modal">
                <button className="close-button" onClick={handleCloseLogin}>X</button>
                <LoginForm />
              </div>
            </div>
          )}

          {!showRegister && (
            <button className='botao_registrar' onClick={handleRegisterButtonClick}>REGISTRAR</button>
          )}
          {showRegister && (
            <div className="overlay" onClick={handleCloseRegister}>
              <div className="modal">
                <button className="close-button" onClick={handleCloseRegister}>X</button>
                <RegistrationForm />
              </div>
            </div>
          )}
        </div>

      </div>

      <div className='meio'>

        <div className='letreiro'>
          <div className='centro'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', minWidth: 300, width: '100%' }}>
              {images.map((image) => (
                <ImageButton
                  focusRipple
                  key={image.title}
                  style={{
                    width: image.width,
                  }}
                >
                  <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      {image.title}
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
              ))}
            </Box>
          </div>
        </div>

        <div className='explicacao'>
          <Box
            sx={{
              display: 'flex',  // Mantém os itens internos dispostos em linha
              justifyContent: 'center',  // Centraliza os itens dentro do Box
              alignItems: 'center',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              color: 'text.secondary',
              '& svg': {
                m: 1,
              },
            }}
          >
            <h1 className='titulo1'>Motivo</h1>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className='texto1'>Bem-vindo a plataforma onde os cidadãos podem reportar problemas urbanos diretamente para os órgãos competentes. Nosso objetivo é melhorar a qualidade de vida em nossa cidade, facilitando a comunicação entre a população e as autoridades responsáveis pela manutenção e desenvolvimento urbano, assim avise os órgãos responsáveis e os outros moradores.</p>
          </Box>
        </div>

        <div className='faixa_quadrado'>
          <div className='quadrado'>
            <div className='esquerda_quadrado'>
              <p className='titulo2'>Envie suas reclamações com fotos no sistema</p>
              <button className='botao_comecar'>COMECE JÁ</button>
            </div>
            <div className='direita_quadrado'></div>
          </div>
        </div>

      </div>

      <div className='rodape'>
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
            '& svg': {
              m: 1,
            },
          }}
        >
          <p className='direitos_rodape1'>SCOUTER® - Marca Registrada</p>
          <p className='direitos_rodape2'>Copyright © 2024 | scouter.com | TODOS OS DIREITOS RESERVADOS</p>
        </Box>
      </div>

    </div>

  )
}

export default App
