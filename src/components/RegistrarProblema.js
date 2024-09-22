import { useState } from 'react';
import axios from 'axios';
import './RegistrarProblema.css'; // Arquivo CSS para estilização

function RegistrarProblema() {
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [foto, setFoto] = useState(null); // Arquivo de foto

  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descricao || !localizacao || !tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    const formData = new FormData();
    formData.append('descricao', descricao);
    formData.append('localizacao', localizacao);
    formData.append('tipo', tipo);
    formData.append('mensagem', mensagem);
    if (foto) {
      formData.append('foto', foto); // Incluindo a foto se houver
    }

    try {
      const response = await axios.post('http://localhost:5173/problemas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Problema registrado com sucesso!');
        setDescricao('');
        setLocalizacao('');
        setTipo('');
        setMensagem('');
        setFoto(null);
      } else {
        alert('Erro ao registrar problema.');
      }
    } catch (error) {
      alert('Erro ao registrar problema.');
      console.error(error);
    }
  };

  return (
    <div className="registrar-problema-container">
      <h1>Registrar Novo Problema</h1>
      <form onSubmit={handleSubmit} className="registrar-problema-form">
        <label>
          Descrição do Problema:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
          />
        </label>
        
        <label>
          Localização:
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            placeholder="Localização"
            required
          />
        </label>

        <label>
          Tipo de Problema:
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Tipo"
            required
          />
        </label>

        <label>
          Mensagem Adicional:
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Mensagem da Publicação"
          />
        </label>

        <label>
          Foto do Problema:
          <input type="file" onChange={handleFotoChange} />
        </label>

        <button type="submit">Registrar Problema</button>
      </form>
    </div>
  );
}

export default RegistrarProblema;
