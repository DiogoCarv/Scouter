
import React, { useState } from 'react';
import axios from 'axios';

function RegistrarProblema() {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descricao || !localizacao || !tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/moradores/registrar-problema', { descricao, localizacao, tipo });
      alert('Problema registrado com sucesso!');
    } catch (error) {
      alert('Erro ao registrar problema.');
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
      <input type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} placeholder="Localização" required />
      <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" required />
      <button type="submit">Registrar Problema</button>
    </form>
  );
}

export default RegistrarProblema;
