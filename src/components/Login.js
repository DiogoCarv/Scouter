
import  { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5173/moradores/autenticar', { email, senha });
      alert('Login bem-sucedido!');
      console.log(response.data);
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro ao fazer login', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
