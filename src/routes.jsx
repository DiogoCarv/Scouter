import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './login';
import OrgaoDashboard from './components/OrgaoDashboard';

import RegistrarProblema from './components/RegistrarProblema';
import ListarProblemas from './components/ListarProblemas';
import Notificacoes from './components/Notificacoes';
import VerificarProblema from './components/VerificarProblema';
import AlterarStatusProblema from './components/AlterarStatusProblema';
import CriarOrgao from './components/CriarOrgao';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        
        {/* Rota do morador */}
        <PrivateRoute exact path="/morador" component={MoradorDashboard} />
        <PrivateRoute exact path="/registrar-problema" component={RegistrarProblema} />
        <PrivateRoute exact path="/listar-problemas" component={ListarProblemas} />
        <PrivateRoute exact path="/notificacoes" component={Notificacoes} />
        
        {/* Rota do órgão responsável */}
        <PrivateRoute exact path="/orgao" component={OrgaoDashboard} />
        <PrivateRoute exact path="/verificar-problema" component={VerificarProblema} />
        <PrivateRoute exact path="/alterar-status" component={AlterarStatusProblema} />
        <PrivateRoute exact path="/listar-problemas-orgao" component={ListarProblemas} />
        <PrivateRoute exact path="/notificacoes-orgao" component={Notificacoes} />
        
        {/* Rota do administrador */}
        <PrivateRoute exact path="/admin" component={AdminDashboard} />
        <PrivateRoute exact path="/criar-orgao" component={CriarOrgao} />
        <PrivateRoute exact path="/listar-todos-problemas" component={ListarProblemas} />
        
        {/* Redirecionar para login por padrão */}
        <Redirect from="*" to="/login" />
      </Switch>
    </Router>
  );
};

export default Routes;
