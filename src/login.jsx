import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import logoVerde from './imagens/logo_verde.png';  // Assumindo que esse caminho esteja correto

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, userType } = response.data;

        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', token);
        
        setSuccessMessage('Login bem-sucedido! Redirecionando...');
        
        // Redirecionar o usuário de acordo com seu tipo
        setTimeout(() => {
          if (userType === 'morador') {
            window.location.href = '/morador';  // Redireciona para a página dos moradores
          } else if (userType === 'orgao') {
            window.location.href = '/orgao';  // Redireciona para a página do órgão responsável
          } else if (userType === 'admin') {
            window.location.href = '/admin';  // Redireciona para a página do admin
          }
        }, 1000);
      } else {
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-form">
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <img src={logoVerde} alt="Logo Verde" width="150px" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome de Usuário"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <ButtonBase type="submit" variant="contained" color="primary">
            Entrar
          </ButtonBase>
        </form>
      </Box>
    </div>
  );
};

export default Login;
