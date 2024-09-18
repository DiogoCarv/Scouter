import './App.css';
import logoVerde from './imagens/logo_verde.png';

// Importações do MUI
import { Box, ButtonBase, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoVerde} className="App-logo" alt="logo" />
        <Typography variant="h1" component="h1">
          Bem-vindo ao Scouter
        </Typography>

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
          <Typography variant="h2">Motivo</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="body1">
            Bem-vindo à plataforma onde os cidadãos podem reportar problemas urbanos diretamente para os órgãos competentes. Nosso objetivo é melhorar a qualidade de vida em nossa cidade, facilitando a comunicação entre a população e as autoridades responsáveis pela manutenção e desenvolvimento urbano.
          </Typography>
        </Box>

        <div className="faixa_quadrado">
          <div className="quadrado">
            <div className="esquerda_quadrado">
              <Typography variant="h3">Envie suas reclamações com fotos no sistema</Typography>
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
      </footer>
    </div>
  );
};

export default App;
