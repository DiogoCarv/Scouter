// src/components/AdminDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Painel do Administrador</h1>
      <ul>
        <li><Link to="/criar-orgao">Criar Órgão Responsável</Link></li>
        <li><Link to="/listar-todos-problemas">Listar Todos os Problemas</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
