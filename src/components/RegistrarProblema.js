
import { useState } from 'react';

function RegistrarProblema() {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [foto, setFoto] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descricao || !localizacao || !tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
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
      <input type="text" value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Mensagem da Publicação" required />
      <input type="checkbox" checked={foto} onChange={(e) => setFoto(e.target.checked)} /> Incluir foto
     
      <button type="submit">Registrar Problema</button>
    </form>
  );
}

export default RegistrarProblema;
