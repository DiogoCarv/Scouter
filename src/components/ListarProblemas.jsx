import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './ListarProblemas.css';

const ListarProblemas = () => {
  const [problemas, setProblemas] = useState([]);
  const [error, setError] = useState('');

  // Buscar problemas ao carregar a página
  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const token = localStorage.getItem('token');  // Recupera o token JWT
        const response = await axios.get('/problema/listar-problemas', {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <div className='cabecalho_listar_problema'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_listar_problema" alt="logo" />
      </div>

      <div className='meio_listar_problema'>
        <h2 className='titulo_listar_problema'>Problemas Registrados</h2>

        {error && <p>{error}</p>}

        <ul>
          {problemas.map((problema) => (
            <li key={problema.id}>{problema.descricao}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListarProblemas;
