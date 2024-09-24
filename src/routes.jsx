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
import AdminDashboard from './components/AdminDashboard';
import principal from './principal';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/principal" element={<principal />} />
      
      {/* Rota do morador */}
      <Route
        path="/morador"
        element={
          
            <MoradorDashboard />
         
        }
      />
      <Route
        path="/registrar-problema"
        element={
          
            <RegistrarProblema />
        
        }
      />
      <Route
        path="/listar-problemas"
        element={
         
            <ListarProblemas />
         
        }
      />
      <Route
        path="/notificacoes"
        element={
         
            <Notificacoes />
          
        }
      />
      
      {/* Rota do órgão responsável */}
      <Route
        path="/orgao"
        element={
          
            <OrgaoDashboard />
          
        }
      />
      <Route
        path="/verificar-problema"
        element={
         
            <VerificarProblema />
          
        }
      />
      <Route
        path="/alterar-status"
        element={
          
            <AlterarStatusProblema />
          
        }
      />
      <Route
        path="/listar-problemas-orgao"
        element={
          
            <ListarProblemas />
         
        }
      />
      <Route
        path="/notificacoes-orgao"
        element={
         
            <Notificacoes />
         
        }
      />
      
      {/* Rota do administrador */}
      <Route
        path="/admin"
        element={
            <AdminDashboard />
         
        }
      />
      <Route
        path="/criar-orgao"
        element={
          
            <CriarOrgao />
          
        }
      />
      <Route
        path="/listar-todos-problemas"
        element={
         
            <ListarProblemas />
          
        }
      />
      
      {/* Redirecionar para app por padrão */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
