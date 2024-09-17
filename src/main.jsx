import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './home/App.jsx';
import Login from './login/login.jsx';  // Importar o componente de login
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} /> {/* Definir a rota para o componente de login */}
      </Routes>
    </Router>
  </React.StrictMode>
);