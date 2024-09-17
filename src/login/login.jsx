// Importações CSS
import './login.css';
import logoVerde from './imagens/logo_verde.png';

// Importações do MUI
import Box from '@mui/material/Box';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {

  return (
    <div className="App">
      
      <header className="cabecalho">
        <div className="logo_cabecalho">
          <img src={logoVerde} className="logo_pequena" alt="Logo" />
        </div>
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
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <div className='label_entrar'>
                  <TextField
                    required
                    id="outlined-required"
                    label="LOGIN"
                  />
                </div>

                <div className='label_senha'>
                  <TextField
                    id="outlined-password-input"
                    label="SENHA *"
                    type="password"
                    autoComplete="current-password"
                  />
                </div>

              </Box>

              <div className='botoes_forms'>

                <div>
                  <Button className='botao_conta'>NÃO TENHO CONTA</Button>
                </div>

                <div>
                  <Button className='botao_senha'>ESQUECI A SENHA</Button>
                </div>

                <div>
                  <Button className='botao_entrar'>ENTRAR</Button>
                </div>

              </div>

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

export default Login;