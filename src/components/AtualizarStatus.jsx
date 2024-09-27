import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import './AtualizarStatus.css';

const AtualizarStatus = ({ problemaId }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orgaoId, setOrgaoId] = useState('');
  const [orgaos, setOrgaos] = useState([]);

  // Fazer a chamada para buscar problemas
  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const response = await axios.get('/problema/listarProblemas');
        setOrgaos(response.data);
      } catch (error) {
        console.error('Erro ao carregar Problemas', error);
        setError('Erro ao carregar Problemas.');
      }
    };

    fetchProblemas();
  }, []);

  // Enviar a atualização de status
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');  // Recupera o token JWT
      const response = await axios.put(`/problema/atualizarStatusProblema/${problemaId}`, 
        { status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.problema) {
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
