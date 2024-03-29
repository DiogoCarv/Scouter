import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import cidadeVerde from './imagens/cidade_verde.jpg'

import logoBranca from './imagens/logo_branca.png'
import logoVerde from './imagens/logo_verde.png'

import nomeBranco from './imagens/nome_branco.png'
import nomeVerde from './imagens/nome_verde.png'

function App() {
  return(

    <div className='App'>

      <div className='cabecalho'>

        <div className='logo_cabecalho'>
          <img src={logoVerde} className='logo_pequena'></img>
        </div>

        <div className='botoes_cabecalho'>
          <button className='botao_entrar'>ENTRAR</button>
          <button className='botao_registrar'>REGISTRAR</button>
        </div>

      </div>

      <div className='meio'>

        <div className='letreiro'>

          <div className='nome_letreiro'>
            <h1 className='nome'>SCOUTER</h1>
          </div>

          <div className='botao_letreiro'>
            <button className='botao_saiba'>SAIBA MAIS</button>
          </div>

        </div>

        <div className='explicacao'>

          <div className='esquerda'>
            <p className='titulo1'>MOTIVO</p>
          </div>

          <div className='direita'>
            <p className='texto1'>Coloque aqui os problemas urbanos e rurais existentes pertos de você, assim avise os orgãos responsáveis e os outros moradores.</p>
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
