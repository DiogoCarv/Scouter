// src/components/AdminDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div>

      <div className='cabecalho_admin'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_admin" alt="logo" />
      </div>

      <div className='principal_admin'>

        <div className='bloco_admin'>

          <h1 className='titulo_admin'>PAINEL ADMINISTRADOR</h1>

          <div className='botoes_admin'>

            <button className='botao_admin'><Link to="/criar-orgao" className='conteudo_admin'>CRIAR ORGÃO RESPONSÁVEL</Link></button>
            <button className='botao_admin'><Link to="/listar-todos-problemas" className='conteudo_admin'>LISTAR PROBLEMAS</Link></button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
