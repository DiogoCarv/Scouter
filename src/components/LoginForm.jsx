import { useState } from 'react';
import './LoginForm.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:5173/login', {  // Porta correta do backend
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', token);
        
        setSuccessMessage('Login bem-sucedido! Redirecionando...');
        
        // Redirecionar o usuário após o login bem-sucedido
        setTimeout(() => {
          window.location.href = '/dashboard';  // Redireciona para o painel
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
    <ThemeProvider theme={createTheme()}>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome de Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
