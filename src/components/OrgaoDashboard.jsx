// src/components/OrgaoDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrgaoDashboard = () => {
  return (
    <div>

      <div className='cabecalho'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
      </div>

      <div className='principal'>

        <div className='bloco'>

          <h1 className='titulo'>PAINEL ORGÃO RESPONSÁVEL</h1>

          <div className='botoes'>
            <button className='botao'><Link to="/verificar-problema" className='conteudo'>VERIFICAR PROBLEMAS</Link></button>
            <button className='botao'><Link to="/alterar-status" className='conteudo'>ALTERAR STATUS DOS PROBLEMAS</Link></button>
            <button className='botao'><Link to="/listar-problemas-orgao" className='conteudo'>LISTAR PROBLEMAS</Link></button>
            <button className='botao'><Link to="/notificacoes-orgao" className='conteudo'>VER NOTIFICAÇÕES</Link></button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OrgaoDashboard;
