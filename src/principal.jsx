import './App.css';

// Importações do MUI
import { Box, ButtonBase, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonBase className="botao_logo">
          <Link to="/">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Link>
        </ButtonBase>

        <div className="botoes_cabecalho">

          <ButtonBase className="botao_registrar">
            <Link to="/registrar" className="letra_botao">
              SAIR
            </Link>
          </ButtonBase>

        </div>

      </header>

      <main className='main'>

        <div className='principal'>

          <div className='esquerda'>
              <ButtonBase className="botao_registrar">
                <Link to="/" className="letra_botao">
                  PUBLICAR
                </Link>
              </ButtonBase>

              <ButtonBase className="botao_registrar">
                <Link to="/registrar" className="letra_botao">
                  CONFIGURAR
                </Link>
              </ButtonBase>

              <ButtonBase className="botao_registrar">
                <Link to="/registrar" className="letra_botao">
                  PESQUISAR
                </Link>
              </ButtonBase>

          </div>

          <div className='direita'>
              <div>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3 className='nome'>Remy Sharp</h3>
              </div>
              <h3 className='titulo'>Buraco na Rua</h3>
              <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="imagem" alt="imagem" />
              <h3 className='data_hora'> 11/09/2024 - 11:24</h3>
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
