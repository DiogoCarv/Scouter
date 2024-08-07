
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  cconst handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/moradores/autenticar', { email, senha });
      alert('Login bem-sucedido!');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
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
