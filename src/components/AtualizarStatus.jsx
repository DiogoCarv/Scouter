import React, { useState } from 'react';

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

        <h2 className='titulo'>Atualizar Status do Problema</h2>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}

        <div className='bloco'>

          <form onSubmit={handleSubmit}>
            <label>
              Status:
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
            <button type="submit" className='botao'>Atualizar</button>
          </form>

        </div>

      </div>

    </div>
  );
};

export default AtualizarStatus;
