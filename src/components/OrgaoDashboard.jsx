// src/components/OrgaoDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrgaoDashboard = () => {
  return (
    <div>
      <h1>Painel do Órgão Responsável</h1>
      <ul>
        <li><Link to="/atualizarStatusProblema">Atualizar Status do Problema</Link></li>
        <li><Link to="/listar-problemas-orgao">Listar Problemas Sob Responsabilidade</Link></li>
        <li><Link to="/notificacoes-orgao">Ver Notificações</Link></li>
      </ul>
    </div>
  );
};

export default OrgaoDashboard;
