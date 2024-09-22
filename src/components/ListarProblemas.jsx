import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarProblemas = () => {
  const [problemas, setProblemas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const token = localStorage.getItem('token');  // Recupera o token JWT
        const response = await axios.get('http://localhost:5173/problemas', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setProblemas(response.data);  // Carrega os problemas
      } catch (err) {
        setError('Erro ao carregar problemas.');
      }
    };

    fetchProblemas();
  }, []);

  return (
    <div>
      <h2>Problemas Registrados</h2>
      {error && <p>{error}</p>}
      <ul>
        {problemas.map((problema) => (
          <li key={problema.id}>
            <strong>Descrição:</strong> {problema.descricao}<br />
            <strong>Localização:</strong> {problema.localizacao}<br />
            <strong>Status:</strong> {problema.status}<br />
            <strong>Tipo:</strong> {problema.tipo}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProblemas;
