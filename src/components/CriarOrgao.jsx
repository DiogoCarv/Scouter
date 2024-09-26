// src/components/CriarOrgao.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CriarOrgao = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:5000/criar-orgao', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nome,
              email,
              senha,
              telefone
          }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao criar órgão competente');
      }

      const data = await response.json();
      setSuccessMessage(`Órgão Competente criado com sucesso! ID: ${data.orgaoId}`);
  } catch (error) {
      setErrorMessage(error.message);
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
        <div>
          <label>Telefone:</label>
          <input type="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Criar Órgão</button>
      </form>
    </div>
  );
};

export default CriarOrgao;
