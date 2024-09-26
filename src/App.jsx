import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './App.css';
import RegistrationForm from './components/RegistrationForm';

import Login from './login';


export function InputAdornments() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

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
      <div className='App-header'>

        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />

        <div>
          {!showLogin && (
            <button className='botao_login' onClick={handleLoginButtonClick}>
              <h3 className='letra_botao'>LOGIN</h3>
            </button>
          )}
          {showLogin && (
            <div className='overlay' onClick={handleCloseLogin}>
              <div className='modal' onClick={e => e.stopPropagation()}>
                <button className='close-button' onClick={handleCloseLogin}>
                  X
                </button>
                <Login />
              </div>
            </div>
          )}
          {!showRegister && (
            <button className='botao_registrar' onClick={handleRegisterButtonClick}>
              <h3 className='letra_botao'>REGISTRAR</h3>
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
            </div>
            <div className="direita_quadrado"></div>
          </div>
        </div>

      </div>

      <div className='rodape'>
        
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

      </div>

    </div>
  );
}

export default App;
