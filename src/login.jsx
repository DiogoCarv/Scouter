import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';  
import TextField from '@mui/material/TextField';
import axios from 'axios';
import logoVerde from './imagens/logo_verde.png';  
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,  // <--- Corrigir aqui
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
          } else if (userType === 'orgaoCompetente') {  // Corrigir o nome do tipo de usuário
            window.location.href = '/orgao';  // Redireciona para a página do órgão responsável
          } else if (userType === 'administrador') {  // Corrigir o nome do tipo de usuário
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button type="submit" variant="contained" className='login-form button'>
            Entrar
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
