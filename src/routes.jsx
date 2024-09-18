import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './login.jsx';
import RegistrationForm from './components/RegistrationForm'; // Importando o componente correto

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />  {/* Rota principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<RegistrationForm />} />  {/* Usando RegistrationForm na rota de registro */}
    </Routes>
  );
};

export default AppRoutes;
