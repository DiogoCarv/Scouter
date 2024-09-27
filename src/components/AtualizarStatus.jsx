import React, { useState, useEffect } from 'react'; // Adicione useEffect aqui
import './AtualizarStatus.css';

const AtualizarStatus = ({ problemaId }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orgaoId, setOrgaoId] = useState('');
  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    const fetchOrgaos = async () => {
      try {
        const response = await fetch('/problemas/listarProblemas');
        if (!response.ok) {
          throw new Error('Erro ao carregar órgãos.');
        }
        const data = await response.json();
        setOrgaos(data);
      } catch (error) {
        console.error('Erro ao carregar problemas', error);
      }
    };

    fetchOrgaos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');  // Recupera o token JWT
      const response = await fetch(`/problema/atualizarStatusProblema/${problemaId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }), // Envia o novo status via problemaController
      });

      const data = await response.json();

      if (data.problema) {
        setSuccess('Status atualizado com sucesso.');
      } else {
        setError('Erro ao atualizar status.');
      }
    } catch (err) {
      setError('Erro ao se conectar com o servidor.');
    }
  };

  return (
    <div>
      <div className='cabecalho'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
      </div>

      <div className='principal'>
        <h2 className='titulo'>ATUALIZAR STATUS DO PROBLEMA</h2>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}

        <div className='bloco'>
          <div className='conteudo_bloco'>
            <form onSubmit={handleSubmit}>
              <label>
                Problema:
                <select value={orgaoId} onChange={(e) => setOrgaoId(e.target.value)} required>
                  <option value="">Selecione um problema</option>
                  {orgaos.map((orgao) => (
                    <option key={orgao.id} value={orgao.id}>
                      {orgao.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label className='label'>
                Status:
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
              <button type="submit" className='botao'>ATUALIZAR</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtualizarStatus;
