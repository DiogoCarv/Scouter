import React from 'react';
import ReactDOM from 'react-dom/client'; // Correto para React 18
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';

// Criando a raiz para o React 18
const root = ReactDOM.createRoot(document.getElementById('root'));



// Renderizando o aplicativo
root.render(

      <BrowserRouter>
      
          <AppRoutes />
      
      </BrowserRouter>
  
);
