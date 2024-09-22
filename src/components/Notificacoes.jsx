import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notificacoes.css';  // Estilização opcional para melhorar o layout

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const token = localStorage.getItem('token');  // Recupera o token JWT
        const response = await axios.get('http://localhost:3000/notificacoes', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Autenticação via JWT
          },
        });

        // Verifica se há notificações
        if (response.status === 200) {
          setNotificacoes(response.data);  // Carrega as notificações
        } else {
          setErrorMessage('Nenhuma notificação disponível no momento.');
        }
      } catch (error) {
        setErrorMessage('Erro ao carregar notificações. Tente novamente.');
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchNotificacoes();
  }, []);

  return (
    <div className="notificacoes-container">
      <h2>Notificações</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {notificacoes.length > 0 ? (
        <ul>
          {notificacoes.map((notificacao) => (
            <li key={notificacao.id} className="notificacao-item">
              <p><strong>Mensagem:</strong> {notificacao.mensagem}</p>
              <p><strong>Data de Envio:</strong> {new Date(notificacao.dataEnvio).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma notificação disponível.</p>
      )}
    </div>
  );
};

export default Notificacoes;
