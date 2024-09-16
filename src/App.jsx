import React, { useState } from 'react';

// Importações CSS
import './App.css';
import logoVerde from './imagens/logo_verde.png';

// Importações do MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Verificação se os componentes são importados corretamente
const checkComponent = (Component) => {
  return Component ? <Component /> : null;
};

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

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="App">
      <header className="cabecalho">
        <div className="logo_cabecalho">
          <img src={logoVerde} className="logo_pequena" alt="Logo" />
        </div>
        <div className="botoes_cabecalho">
          <button className="botao_entrar">
            <a className='letra_botao' href='login.jsx'>ENTRAR</a>
          </button>
          <button className="botao_registrar">
            <a className='letra_botao' href='login.jsx'>REGISTRAR</a>
          </button>
        </div>
      </header>

      <main className="meio">

      <div className="letreiro">
        {images.map((image) => (
          <ImageButton
            key={image.title}
            style={{
              width: image.width,
              // Não define altura aqui, pois será gerida pelo CSS
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                style={{ textAlign: 'center' }} // Adiciona alinhamento centralizado ao texto
              >
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
              '& svg': {
                m: 1,
              },
            }}
          >
            <h1 className="titulo1">Motivo</h1>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className="texto1">Bem-vindo a plataforma onde os cidadãos podem reportar problemas urbanos diretamente para os órgãos competentes. Nosso objetivo é melhorar a qualidade de vida em nossa cidade, facilitando a comunicação entre a população e as autoridades responsáveis pela manutenção e desenvolvimento urbano, assim avise os órgãos responsáveis e os outros moradores.</p>
          </Box>
        </div>

        <div className="faixa_quadrado">
          <div className="quadrado">
            <div className="esquerda_quadrado">
              <p className="titulo2">Envie suas reclamações com fotos no sistema</p>
              <button className="botao_comecar">
                <a className='letra_botao2'>COMECE JÁ</a>
              </button>
            </div>
            <div className="direita_quadrado"></div>
          </div>
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
            '& svg': {
              m: 1,
            },
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
