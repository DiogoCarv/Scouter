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
      const response = await axios.post('http://localhost:5000/criar-orgao', {
        nome,
        email,
        senha,
        telefone
      });

      setSuccessMessage(`Órgão Competente criado com sucesso! ID: ${response.data.orgaoId}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Erro ao criar órgão competente');
    }
  };

  return (
    <div>
      <div className='cabecalho_criar_orgao'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_criar_orgao" alt="logo" />
      </div>

      <div className='principal_criar_orgao'>
        <div className='bloco_criar_orgao'>
          <h1 className='titulo_criar_orgao'>CRIAR ORGÃO RESPONSÁVEL</h1>

          <form onSubmit={handleSubmit}>
            <div className='preencher_criar_orgao'>
              <label>NOME:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div className='preencher_criar_orgao'>
              <label>EMAIL:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className='preencher_criar_orgao'>
              <label>SENHA:</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>

            <div className='preencher_criar_orgao'>
              <label>TELEFONE:</label>
              <input type="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <button type="submit" className='botao_criar_orgao'>CRIAR ORGÃO</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriarOrgao;
