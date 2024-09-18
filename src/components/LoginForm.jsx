import { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente
    try {
      const response = await fetch('http://localhost:3001/login', {  // Verifique a porta correta do backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao realizar o login');
      }

      const data = await response.json();
      console.log('Login bem-sucedido:', data);
      // Aqui você pode salvar o token ou redirecionar o usuário após o login
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErrorMessage('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Mostrar mensagem de erro */}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
