// src/components/CriarOrgao.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './CriarOrgao.css';

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

      <div className='cabecalho'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
      </div>

      <div className='principal'>

        <div className='bloco'>
          
          <h1 className='titulo'>CRIAR ORGÃO RESPONSÁVEL</h1>

          <form onSubmit={handleSubmit}>

            <div className='preencher'>
              <label>NOME:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div className='preencher'>
              <label>EMAIL:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className='preencher'>
              <label>SENHA:</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>

            <div className='preencher'>
              <label>TELEFONE:</label>
              <input type="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <button type="submit" className='botao'>CRIAR ORGÃO</button>

          </form>
        </div>

      </div>

    </div>
  );
};

export default CriarOrgao;
