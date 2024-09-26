import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';  
import TextField from '@mui/material/TextField';
import logoVerde from './imagens/logo_verde.png';  
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); // Inicializa o hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Corpo da requisição
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao fazer login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Redirecionar baseado no userType
      switch (data.userType) {
          case 'morador':
              navigate('/dashboardMorador');
              break;
          case 'administrador':
              navigate('/dashboardAdministrador');
              break;
          case 'orgaoCompetente':
              navigate('/dashboardOrgaoCompetente');
              break;
          default:
              break;
      }
  } catch (error) {
      setErrorMessage(error.message);
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
