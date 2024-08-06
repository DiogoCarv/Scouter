
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import RegistrarProblema from './components/RegistrarProblema';
import VerificarProblema from './components/VerificarProblema';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registrar-problema" component={RegistrarProblema} />
        <Route path="/verificar-problema" component={VerificarProblema} />
      </Switch>
    </Router>
  );
}

export default App;
