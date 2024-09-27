// src/components/OrgaoDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './OrgaoDashboard.css';

const OrgaoDashboard = () => {
  return (
    <div>

      <div className='cabecalho_orgao'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_orgao" alt="logo" />
      </div>

      <div className='principal_orgao'>

        <div className='bloco_orgao'>

          <h1 className='titulo_orgao'>PAINEL ORGÃO RESPONSÁVEL</h1>

          <div className='botoes_orgao'>
            <button className='botao_orgao'><Link to="/atualizarStatusProblema" className='conteudo_orgao'>ALTERAR STATUS DOS PROBLEMAS</Link></button>
            <button className='botao_orgao'><Link to="/listar-problemas-orgao" className='conteudo_orgao'>LISTAR PROBLEMAS</Link></button>
            <button className='botao_orgao'><Link to="/notificacoes-orgao" className='conteudo_orgao'>VER NOTIFICAÇÕES</Link></button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OrgaoDashboard;
