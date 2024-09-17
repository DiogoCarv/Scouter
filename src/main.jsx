import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './home/App.jsx';
import Login from './login/login.jsx';
import Registrar from './registrar/registrar.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </Router>
  </React.StrictMode>
);