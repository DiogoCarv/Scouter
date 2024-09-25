// src/components/MoradorDashboard.jsx

import './MoradorDashboard.css';

import React from 'react';
import { Link } from 'react-router-dom';

const MoradorDashboard = () => {
  return (
    <div>

      <div className='cabecalho'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
      </div>

      <div className='principal'>

        <div className='bloco'>

          <h1 className='titulo'>Painel do Morador</h1>

          <div className='botoes'>
            <button className='botao'><Link to="/registrar-problema" className='conteudo'>REGISTRAR PROBLEMA</Link></button>
            <button className='botao'><Link to="/listar-problemas" className='conteudo'>LISTAR PROBLEMAS CRIADOS</Link></button>
            <button className='botao'><Link to="/notificacoes" className='conteudo'>VER NOTIFICAÇÕES</Link></button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MoradorDashboard;
