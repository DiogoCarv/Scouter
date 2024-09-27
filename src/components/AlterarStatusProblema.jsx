import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Adicionar Axios para requisições HTTP
import './AlterarStatusProblema.css';

const AlterarStatusProblema = () => {
  const [problemas, setProblemas] = useState([]);
  const [selectedProblema, setSelectedProblema] = useState('');
  const [novoStatus, setNovoStatus] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Buscar os problemas ao carregar a página
  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const response = await axios.get('/problema/listarProblemas'); // Utilizando Axios
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
      const response = await axios.put(`/problema/atualizarProblema/${selectedProblema}`, {
        status: novoStatus
      });

      if (response.status === 200) {
        setMensagem('Status atualizado com sucesso');
      } else {
        setMensagem('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro ao atualizar status', error);
      setMensagem('Erro ao atualizar status');
    }
  };

  return (
    <div>
      <h1>Alterar Status de Problema</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Problema:
          <select value={selectedProblema} onChange={(e) => setSelectedProblema(e.target.value)}>
            <option value="">Selecione um problema</option>
            {problemas.map((problema) => (
              <option key={problema.id} value={problema.id}>
                {problema.descricao}
              </option>
            ))}
          </select>
        </label>

        <label>
          Novo Status:
          <input
            type="text"
            value={novoStatus}
            onChange={(e) => setNovoStatus(e.target.value)}
          />
        </label>

        <button type="submit">Atualizar Status</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default AlterarStatusProblema;
