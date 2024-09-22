import { useEffect, useState } from 'react';
import axios from 'axios';
import './VerificarProblema.css';  // Estilização opcional

const VerificarProblema = () => {
  const [problemas, setProblemas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const token = localStorage.getItem('token');  // Recupera o token JWT
        const response = await axios.get('http://localhost:5173/moradores/verificar-problema', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Autenticação JWT
          },
        });

        if (response.data.length === 0) {
          setErrorMessage('Nenhum problema encontrado.');
        } else {
          setProblemas(response.data);
        }
      } catch (error) {
        setErrorMessage('Erro ao carregar problemas. Tente novamente.');
        console.error(error);
      }
    };

    fetchProblemas();
  }, []);

  return (
    <div className="verificar-problema-container">
      <h1>Problemas Registrados</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {problemas.length > 0 ? (
        <ul>
          {problemas.map((problema) => (
            <li key={problema.id} className="problema-item">
              <p><strong>Descrição:</strong> {problema.descricao}</p>
              <p><strong>Localização:</strong> {problema.localizacao}</p>
              <p><strong>Tipo:</strong> {problema.tipo}</p>
            </li>
          ))}
        </ul>
      ) : (
        !errorMessage && <p>Carregando problemas...</p>
      )}
    </div>
  );
};

export default VerificarProblema;
