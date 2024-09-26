// src/components/AdminDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div>

      <div className='cabecalho'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo" alt="logo" />
      </div>

      <div className='principal'>

        <div className='bloco'>

          <h1 className='titulo'>PAINEL ADMINISTRADOR</h1>

          <div className='botoes'>

            <button className='botao'><Link to="/criar-orgao" className='conteudo'>CRIAR ORGÃO RESPONSÁVEL</Link></button>
            <button className='botao'><Link to="/listar-todos-problemas" className='conteudo'>LISTAR PROBLEMAS</Link></button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
