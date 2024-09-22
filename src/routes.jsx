import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import OrgaoDashboard from './components/OrgaoDashboard';
import App from './App';
import RegistrarProblema from './components/RegistrationForm';
import ListarProblemas from './components/ListarProblemas';
import Notificacoes from './components/Notificacoes';
import VerificarProblema from './components/VerificarProblema';
import AlterarStatusProblema from './components/AlterarStatusProblema';
import MoradorDashboard from './components/MoradorDashBoard';
import CriarOrgao from './components/CriarOrgao';
import AdminDashboard from './components/AdminDashBoard';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      
      {/* Rota do morador */}
      <Route
        path="/morador"
        element={
          <PrivateRoute>
            <MoradorDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/registrar-problema"
        element={
          <PrivateRoute>
            <RegistrarProblema />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-problemas"
        element={
          <PrivateRoute>
            <ListarProblemas />
          </PrivateRoute>
        }
      />
      <Route
        path="/notificacoes"
        element={
          <PrivateRoute>
            <Notificacoes />
          </PrivateRoute>
        }
      />
      
      {/* Rota do órgão responsável */}
      <Route
        path="/orgao"
        element={
          <PrivateRoute>
            <OrgaoDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/verificar-problema"
        element={
          <PrivateRoute>
            <VerificarProblema />
          </PrivateRoute>
        }
      />
      <Route
        path="/alterar-status"
        element={
          <PrivateRoute>
            <AlterarStatusProblema />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-problemas-orgao"
        element={
          <PrivateRoute>
            <ListarProblemas />
          </PrivateRoute>
        }
      />
      <Route
        path="/notificacoes-orgao"
        element={
          <PrivateRoute>
            <Notificacoes />
          </PrivateRoute>
        }
      />
      
      {/* Rota do administrador */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/criar-orgao"
        element={
          <PrivateRoute>
            <CriarOrgao />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-todos-problemas"
        element={
          <PrivateRoute>
            <ListarProblemas />
          </PrivateRoute>
        }
      />
      
      {/* Redirecionar para app por padrão */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
