import { useState } from 'react';

// Importações CSS
import './App.css';
import logoVerde from './imagens/logo_verde.png';

// Importações Login e Registrar
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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
            <button className='botao_entrar' onClick={handleLoginButtonClick}>
              ENTRAR
            </button>
          )}
          {showLogin && (
            <div className='overlay' onClick={handleCloseLogin}>
              <div className='modal' onClick={e => e.stopPropagation()}>
                <button className='close-button' onClick={handleCloseLogin}>
                  X
                </button>
                <LoginForm />
              </div>
            </div>
          )}

          {!showRegister && (
            <button className='botao_registrar' onClick={handleRegisterButtonClick}>
              REGISTRAR
            </button>
          )}
          {showRegister && (
            <div className='overlay' onClick={handleCloseRegister}>
              <div className='modal' onClick={e => e.stopPropagation()}>
                <button className='close-button' onClick={handleCloseRegister}>
                  X
                </button>
                <RegistrationForm />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='meio'>
        <div className='box_login'>
          <Box
            height={200}
            width={200}
            my={4}
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={4}
            p={2}
            sx={{ border: '2px solid grey' }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
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
  );
}

export default App;