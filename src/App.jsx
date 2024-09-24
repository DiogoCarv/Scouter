import { useState } from 'react';
import Box from '@mui/material/Box';
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
                  x
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
