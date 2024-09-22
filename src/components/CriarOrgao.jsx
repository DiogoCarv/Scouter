// src/components/CriarOrgao.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CriarOrgao = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/admin/criar-orgao', {
        nome,
        email,
        senha,
        tipo: 'orgao'  // Tipo específico para órgão
      });
      
      if (response.status === 201) {
        setSuccessMessage('Órgão criado com sucesso!');
      } else {
        setErrorMessage('Erro ao criar órgão.');
      }
    } catch (error) {
      setErrorMessage('Erro ao criar órgão.');
    }
  };

  return (
    <div>
      <h1>Criar Órgão Responsável</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Criar Órgão</button>
      </form>
    </div>
  );
};

export default CriarOrgao;
