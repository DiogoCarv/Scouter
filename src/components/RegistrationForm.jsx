import { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrarMorador = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCepChange = (e) => {
    const newCep = e.target.value.replace(/\D/g, '');
    setCep(newCep);
    setErrorMessage(null);

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
        .catch(error => console.error('Erro ao buscar o endereço pelo CEP', error));
    }
  };

  // Enviar os dados para o back-end
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !cep || !address) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/moradores', {
        email,
        password,
        cep,
        address,
      });
      if (response.status === 201) {
        console.log('Registrado com sucesso:', response.data);
        setSuccessMessage('Registrado com sucesso!');
      }
      setSuccessMessage('Registro concluído com sucesso!');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Erro ao registrar o usuário. Verifique os dados e tente novamente.');
      console.error('Erro no registro', error);
    }
  };

  return (
    <div className="form-container">
      <img src="https://i.ibb.co/vJRNYqQ/logo-verde.png" className="logo-forms" alt="logo" />
      <form onSubmit={handleSubmit}>
        <div className='label-divisao'>
          <label className='label'>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='label-divisao'>
          <label className='label'>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='label-divisao'>
          <label className='label'>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            required
          />
        </div>
        {address && (
          <div>
            <label className='label'>Endereço:</label>
            <input type="text" value={address} readOnly />
          </div>
        )}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit" className='botao_registrar'>Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarMorador;
