import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import LoginForm from './components/LoginForm';

import cidadeVerde from './imagens/cidade_verde.jpg'

import logoBranca from './imagens/logo_branca.png'
import logoVerde from './imagens/logo_verde.png'

import nomeBranco from './imagens/nome_branco.png'
import nomeVerde from './imagens/nome_verde.png'
import RegistrationForm from './components/RegistrationForm';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginButtonClick = () => {
      setShowLogin(true);
  };

  const handleCloseLogin = () => {
      setShowLogin(false);
  };

  const handleRegisterButtonClick = () => {
    setShowRegister(true);
};

const handleCloseRegister = () => {
    setShowRegister(false);
};
  return(

    <div className='App'>

      <div className='cabecalho'>

        <div className='logo_cabecalho'>
          <img src={logoVerde} className='logo_pequena'></img>
        </div>

        <div className='botoes_cabecalho'>
            {!showLogin && (
                <button className='botao_entrar' onClick={handleLoginButtonClick}>ENTRAR</button>
            )}
            {showLogin && (
                <div className="overlay" onClick={handleCloseLogin}>
                    <div className="modal">
                        <button className="close-button" onClick={handleCloseLogin}>X</button>
                        <LoginForm />
                    </div>
                </div>
            )}

          {!showRegister && (
                <button className='botao_registrar' onClick={handleRegisterButtonClick}>REGISTRAR</button>
            )}
            {showRegister && (
                <div className="overlay" onClick={handleCloseRegister}>
                    <div className="modal">
                        <button className="close-button" onClick={handleCloseRegister}>X</button>
                        <RegistrationForm />
                    </div>
                </div>
            )}
        </div>

      </div>

      <div className='meio'>
      
          <div className='letreiro'>

            <div className='nome_letreiro'>
                <h1 className='nome'>SCOUTER</h1>
                
            </div>  
            <div class="centro_botao">
            <i className="icon icon-angle-down seta"></i>
            </div>
            <div class="centro_botao">
              
              <button class="botao_saiba">Saiba Mais</button>
              
           </div>
          </div>

       

        <div className='explicacao'>

            <div className='esquerda'>
              <p className='titulo1'>MOTIVO</p>
             
            </div>
           
            <div className='direita'>
              <p className='texto1'>Coloque aqui os problemas urbanos e rurais existentes pertos de você,<br></br> assim avise os orgãos responsáveis e os outros moradores.</p>
            </div>

        </div>

        <div className='faixa_quadrado'>

          <div className='quadrado'>

            <div className='esquerda_quadrado'>
              <p className='titulo2'>Envie suas reclamações com fotos no sistema</p>
            </div>

            <div className='direita_quadrado'>

            </div>

          </div>

        </div>

      </div>

      

      <div className='rodape'>
        <p className='direitos_rodape1'>SCOUTER® - Marca Registrada</p>
        <p className='direitos_rodape2'>Copyright © 2024 | scouter.com | TODOS OS DIREITOS RESERVADOS</p>
      </div>

    </div>

  )
}

export default App
