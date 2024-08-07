
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VerificarProblema() {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/moradores/verificar-problema');
        if (response.data.length === 0) {
          alert('Nenhum problema encontrado.');
        }
        setProblemas(response.data);
      } catch (error) {
        alert('Erro ao carregar problemas.');
        console.error(error);
      }
    };
    fetchProblemas();
  }, []);
  

  return (
    <div>
      <h1>Problemas Registrados</h1>
      <ul>
        {problemas.map((problema) => (
          <li key={problema.id}>
            {problema.descricao} - {problema.localizacao} - {problema.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerificarProblema;
