import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Adicionar Axios para requisições HTTP
import './Notificacoes.css';  // Estilização opcional para melhorar o layout

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const token = localStorage.getItem('token');  // Recupera o token JWT
        const response = await axios.get('/notificacao/listarNotificacoes', {
          headers: {
            Authorization: `Bearer ${token}`,  // Autenticação via JWT
          },
        });

        if (response.data.length > 0) {
          setNotificacoes(response.data);  // Carrega as notificações
        } else {
          setErrorMessage('Nenhuma notificação disponível no momento.');
        }
      } catch (error) {
        setErrorMessage('Erro ao carregar notificações. Tente novamente.');
      }
    };

    fetchNotificacoes();
  }, []);

  return (
    <div className="notificacoes-container">

      <div className='cabecalho_notificacoes'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_notificacoes" alt="logo" />
      </div>

      <div className='meio_notificacoes'>

        <h2 className='titulo_notificacoes'>Notificações</h2>

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

    </div>
  );
};

export default Notificacoes;
