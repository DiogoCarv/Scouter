import React from 'react';
import ReactDOM from 'react-dom/client'; // Correto para React 18
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
