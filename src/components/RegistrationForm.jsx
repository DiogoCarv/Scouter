import { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

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
            setAddress('');
          } else {
            setAddress(`${data.logradouro}, ${data.localidade} - ${data.uf}`);
          }
        })
        .catch(error => console.error('Erro ao buscar o endereço:', error));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);  // Limpar mensagem de erro ao tentar novamente

    try {
      const response = await fetch('http://localhost:3001/register', {  // Verifique a porta correta do backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, address }),
      });

      if (!response.ok) {
        throw new Error('Falha ao realizar o registro');
      }

      const data = await response.json();
      console.log('Registro bem-sucedido:', data);
      // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setErrorMessage('Erro ao registrar. Por favor, tente novamente.');
    }
  };

  return (
    <div className="registration-form-container">
      <h1>Registro</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Mostrar mensagem de erro */}
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={handleCepChange}
          maxLength={8}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          readOnly
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
