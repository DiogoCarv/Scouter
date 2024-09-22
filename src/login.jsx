import './login.css';

// Importações do MUI
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <ButtonBase className="botao_logo">
          <Link to="/">
            <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
          </Link>
        </ButtonBase>
      </header>

      <main className="meio">
        <div className='formulario'>
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
            <div className='formulario_conteudo'>
              <div className='formulario_login'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TextField
                    id="outlined-required"
                    label="LOGIN"
                  />
                </Box>
              </div>

              <div className='formulario_senha'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TextField
                    id="outlined-password-input"
                    label="SENHA"
                    type="password"
                    autoComplete="current-password"
                  />
                </Box>
              </div>

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <ButtonBase className="botao_login">
                  <Link className="letra_botao">
                    Login
                  </Link>
                </ButtonBase>
              </Box>
            </div>
          </Box>
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
}

export default App;

