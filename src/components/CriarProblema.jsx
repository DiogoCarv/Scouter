import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CriarProblema.css';

const CriarProblema = () => {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [orgaoId, setOrgaoId] = useState('');
  const [orgaos, setOrgaos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Buscar os órgãos competentes ao carregar a página
  useEffect(() => {
    const fetchOrgaos = async () => {
      try {
        const response = await axios.get('/orgao/listarOrgao'); // Utilizando Axios
        setOrgaos(response.data);
      } catch (error) {
        console.error('Erro ao carregar órgãos', error);
        setErrorMessage('Erro ao carregar órgãos.');
      }
    };

    fetchOrgaos();
  }, []);

  // Enviar o novo problema
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('/problema/criarProblema', {
        descricao,
        localizacao,
        orgaoId
      });

      if (response.status === 200) {
        // Notificar o órgão competente
        await notificarOrgao(orgaoId, descricao);

        setSuccessMessage('Problema criado com sucesso!');
        setDescricao('');
        setLocalizacao('');
        setOrgaoId('');
      } else {
        setErrorMessage('Erro ao criar problema.');
      }
    } catch (error) {
      setErrorMessage('Erro ao se conectar com o servidor.');
    }
  };

  // Função para notificar o órgão competente
  const notificarOrgao = async (orgaoId, descricaoProblema) => {
    try {
      await axios.post('/notificacao/criarNotificacao', {
        orgaoId,
        descricao: `Novo problema criado: ${descricaoProblema}`
      });
    } catch (error) {
      console.error('Erro ao notificar o órgão:', error);
    }
  };

  return (
    <div>
      <div className='cabecalho'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
      </div>

      <div className="criar-problema-container">
        <h1 className='titulo'>CRIAR PROBLEMA</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label className='label'>
            DESCRIÇÃO:
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </label>
          <label className='label'>
            LOCALIZAÇÃO:
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              required
            />
          </label>
          <label className='label'>
            ORGÃO COMPETENTE:
            <select value={orgaoId} onChange={(e) => setOrgaoId(e.target.value)} required>
              <option value="">Selecione um órgão</option>
              {orgaos.map((orgao) => (
                <option key={orgao.id} value={orgao.id}>
                  {orgao.nome}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className='botao'>CRIAR PROBLEMA</button>
        </form>
      </div>
    </div>
  );
};

export default CriarProblema;
