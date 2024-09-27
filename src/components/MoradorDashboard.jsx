
import './MoradorDashboard.css';

import React from 'react';
import { Link } from 'react-router-dom';

const MoradorDashboard = () => {
  return (
    <div>

      <div className='cabecalho_morador'>
        <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="App-logo_morador" alt="logo" />
      </div>

      <div className='principal_morador'>

        <div className='bloco_morador'>

          <h1 className='titulo_morador'>Painel do Morador</h1>

          <div className='botoes_morador'>
            <button className='botao_morador'><Link to="/registrar-problema" className='conteudo_morador'>REGISTRAR PROBLEMA</Link></button>
            <button className='botao_morador'><Link to="/listar-problemas" className='conteudo_morador'>LISTAR PROBLEMAS CRIADOS</Link></button>
            <button className='botao_morador'><Link to="/notificacoes" className='conteudo_morador'>VER NOTIFICAÇÕES</Link></button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MoradorDashboard;
