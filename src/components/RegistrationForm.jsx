import { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';  // Estilização opcional

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Manipular a mudança do CEP e buscar o endereço usando a API ViaCEP
  const handleCepChange = (e) => {
    const newCep = e.target.value.replace(/\D/g, '');  // Remove caracteres não numéricos
    setCep(newCep);
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente

    if (newCep.length === 8) {
      fetch(`https://viacep.com.br/ws/${newCep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            setErrorMessage('CEP inválido');
            setAddress('');  // Limpar o endereço se o CEP for inválido
          } else {
            setAddress(`${data.logradouro}, ${data.localidade} - ${data.uf}`);
          }
        })
        .catch(error => console.error('Erro ao buscar o endereço pelo CEP', error));
    }
  };

  // Enviar os dados para o back-end
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !cep || !address) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Requisição POST para criar o usuário/morador
      const response = await axios.post('http://localhost:5173/moradores', {
        username,
        password,
        cep,
        address,
      });

      setSuccessMessage('Registro concluído com sucesso!');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Erro ao registrar o usuário. Verifique os dados e tente novamente.');
      console.error('Erro no registro', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Morador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            required
          />
        </div>
        {address && (
          <div>
            <label>Endereço:</label>
            <input type="text" value={address} readOnly />
          </div>
        )}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
