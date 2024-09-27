import React, { useState, useEffect } from 'react';
import './CriarProblema.css';

const CriarProblema = () => {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [orgaoId, setOrgaoId] = useState('');
  const [orgaos, setOrgaos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchOrgaos = async () => {
      try {
        const response = await fetch('/orgao/listarOrgao');
        if (!response.ok) {
          throw new Error('Erro ao carregar órgãos.');
        }
        const data = await response.json();
        setOrgaos(data);
      } catch (error) {
        console.error('Erro ao carregar órgãos', error);
      }
    };

    fetchOrgaos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/problema/criarProblema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao, localizacao, orgaoId }),
      });

      if (response.ok) {
        // Notificar o órgão
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

  // Função para notificar o órgão
  const notificarOrgao = async (orgaoId, descricaoProblema) => {
    try {
      await fetch('/notificacao/criarNotificacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orgaoId, descricao: `Novo problema criado: ${descricaoProblema}` }),
      });
    } catch (error) {
      console.error('Erro ao notificar o órgão:', error);
    }
  };

  return (
    <div>

      <div className='cabecalho_criar_problema'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_criar_problema" alt="logo" />
      </div>

      <div className="criar-problema-container">

        <h1 className='titulo_criar_problema'>CRIAR PROBLEMA</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>

          <label className='label_criar_problema'>
            DESCRIÇÃO:
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </label>

          <label className='label_criar_problema'>
            LOCALIZAÇÃO:
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              required
            />
          </label>

          <label className='label_criar_problema'>
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

          <button type="submit" className='botao_criar_problema'>CRIAR PROBLEMA</button>

        </form>

      </div>

    </div>
  );
};

export default CriarProblema;
