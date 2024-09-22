import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlterarStatusProblema.css';

const AlterarStatusProblema = () => {
  const [problemas, setProblemas] = useState([]);
  const [selectedProblema, setSelectedProblema] = useState('');
  const [novoStatus, setNovoStatus] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Busca os problemas ao carregar a página
  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orgao/listar-problemas'); // Rota para listar problemas
        setProblemas(response.data);
      } catch (error) {
        console.error('Erro ao carregar problemas', error);
      }
    };

    fetchProblemas();
  }, []);

  // Enviar o novo status
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/orgao/atualizar-status/${selectedProblema}`, {
        status: novoStatus
      });

      if (response.status === 200) {
        setMensagem('Status atualizado com sucesso!');
      }
    } catch (error) {
      setMensagem('Erro ao atualizar o status do problema.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Alterar Status do Problema</h1>

      {/* Selecionar o problema */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Selecione o Problema:</label>
          <select
            value={selectedProblema}
            onChange={(e) => setSelectedProblema(e.target.value)}
            required
          >
            <option value="">Selecione um problema</option>
            {problemas.map((problema) => (
              <option key={problema.id} value={problema.id}>
                {problema.descricao} - {problema.localizacao}
              </option>
            ))}
          </select>
        </div>

        {/* Input para o novo status */}
        <div>
          <label>Novo Status:</label>
          <input
            type="text"
            value={novoStatus}
            onChange={(e) => setNovoStatus(e.target.value)}
            required
          />
        </div>

        <button type="submit">Atualizar Status</button>
      </form>

      {/* Mensagem de sucesso ou erro */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default AlterarStatusProblema;
