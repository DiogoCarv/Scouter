import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './login.jsx';
import Registrar from './registrar.jsx';
import Principal from './principal.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/principal" element={<Principal />} />
    </Routes>
  );
};

export default AppRoutes;
