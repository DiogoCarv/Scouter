import React, { useState } from 'react';
import axios from 'axios';

const AtualizarStatus = ({ problemaId }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');  // Recupera o token JWT
      const response = await axios.put(`http://localhost:5173/problemas/${problemaId}/status`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

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
      <h2>Atualizar Status do Problema</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Novo Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Atualizar Status</button>
      </form>
    </div>
  );
};

export default AtualizarStatus;
