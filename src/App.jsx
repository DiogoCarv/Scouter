import './App.css';

// Importações do MUI
import { Box, ButtonBase, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <header className="cabecalho">
        <div className="logo_cabecalho">
          <img src={logoVerde} className="logo_pequena" alt="Logo" />
        </div>
        <div className="botoes_cabecalho">
        <button className="botao_entrar">
          <Link className='letra_botao' to='/login'>ENTRAR</Link>
        </button>
        <button className="botao_registrar">
          <Link className='letra_botao' to='/login'>REGISTRAR</Link>
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
};

export default App;
