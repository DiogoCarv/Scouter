import './registrar.css';

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

              <div className='formulario_nome'>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

                  <div className='label_nome'>

                    <TextField
                      id="outlined-required"
                      label="NOME COMPLETO"
                    />

                  </div>

                  <div className='label_cpf'>

                    <TextField
                      id="outlined-required"
                      label="CPF"
                    />

                  </div>

                </Box>

              </div>

              <div className='formulario_email'>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

                  <div className='label_email'>

                    <TextField
                      id="outlined-required"
                      label="EMAIL"
                    />

                  </div>

                  <div className='label_cep'>

                    <TextField
                      id="outlined-required"
                      label="CEP"
                    />

                  </div>

                </Box>

              </div>

              <div className='formulario_senha'>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

                  <div className='label_senha'>

                    <TextField
                      id="outlined-password-input"
                      label="SENHA"
                      type="password"
                      autoComplete="current-password"
                    />

                  </div>

                  <div className='label_confirma_senha'>

                    <TextField
                      id="outlined-password-input"
                      label="CONFIRMA SENHA"
                      type="password"
                      autoComplete="current-password"
                    />

                  </div>

                </Box>

              </div>

              <div className='botao'>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>

                  <ButtonBase className="botao_registrar">

                    <Link className="letra_botao">
                      REGISTRAR
                    </Link>

                  </ButtonBase>

                </Box>

              </div>

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

