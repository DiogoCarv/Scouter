import './App.css';

// Importações do MUI
import { Box, ButtonBase, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonBase className="botao_logo">
          <Link to="/principal">
            <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
          </Link>
        </ButtonBase>

        <div className="botoes_cabecalho">

          <ButtonBase className="botao_login">
            <Link to="/login" className="letra_botao">
              Login
            </Link>
          </ButtonBase>

          <ButtonBase className="botao_registrar">
            <Link to="/registrar" className="letra_botao">
              Registrar
            </Link>
          </ButtonBase>

        </div>

      </header>

      <main>

        <div className='carrosel'>
          <h1 className='titulo_carrosel'>SCOUTER</h1>
        </div>

        <div className='motivo'>
          <div className='conteudo_motivo'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                color: 'text.secondary',
                p: 2,
              }}
            >
              <h2 className='titulo_motivo'>Motivo</h2>

              <Divider orientation="vertical" variant="middle" flexItem />

              <h2 className='texto_motivo'>
                Bem-vindo à plataforma onde os cidadãos podem reportar problemas urbanos diretamente para os órgãos competentes. Nosso objetivo é melhorar a qualidade de vida em nossa cidade, facilitando a comunicação entre a população e as autoridades responsáveis pela manutenção e desenvolvimento urbano.
              </h2>

            </Box>
          </div>
        </div>

        <div className="faixa_quadrado">
          <div className="quadrado">
            <div className="esquerda_quadrado">
              <h2 className='conteudo_quadrado'>Envie suas reclamações com fotos no sistema</h2>
              <ButtonBase className="botao_comecar">
                <Link to="/registrar" className="letra_botao2">
                  COMECE JÁ
                </Link>
              </ButtonBase>
            </div>
            <div className="direita_quadrado"></div>
          </div>
        </div>
      </main>

      <footer className="rodape">
        <div className='direitos'>
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
              p: 2,
            }}
          >
            <Typography variant="body2">SCOUTER® - Marca Registrada</Typography>
            <Typography variant="body2">Copyright © 2024 | scouter.com | TODOS OS DIREITOS RESERVADOS</Typography>
          </Box>
        </div>
      </footer>
    </div>
  );
};

export default App;
