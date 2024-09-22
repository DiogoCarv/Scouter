// src/components/MoradorDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const MoradorDashboard = () => {
  return (
    <div>
      <h1>Painel do Morador</h1>
      <ul>
        <li><Link to="/registrar-problema">Registrar Problema</Link></li>
        <li><Link to="/listar-problemas">Listar Problemas Criados</Link></li>
        <li><Link to="/notificacoes">Ver Notificações</Link></li>
      </ul>
    </div>
  );
};

export default MoradorDashboard;
