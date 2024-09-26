import { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Usando 'password'
  const [address, setAddress] = useState(''); // Usando 'address'
  const [cep, setCep] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para buscar o endereço pelo CEP usando a API do ViaCEP
  const buscarEnderecoViaCep = async (cep) => {
      try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          
          if (data.erro) {
              throw new Error('CEP não encontrado');
          }

          // Preenche o campo address com o logradouro
          setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
      } catch (error) {
          setErrorMessage('Erro ao buscar o endereço. Verifique o CEP.');
          setAddress(''); // Limpa o campo de address se o CEP não for encontrado
      }
  };

  // Validação para garantir que todos os campos estão preenchidos
  const validarCampos = () => {
      if (!nome || !email || !password || !address || !cep) { // Usando 'address' e 'password'
          setErrorMessage('Todos os campos devem ser preenchidos.');
          return false;
      }
      return true;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');

      // Validação dos campos
      if (!validarCampos()) return;

      try {
          const response = await fetch('http://localhost:5000/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  nome,
                  email,
                  password,  // Usando 'password'
                  address,   // Usando 'address'
                  cep,
                  userType: 'morador'  // Definindo o userType como 'morador'
              }),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Erro ao registrar morador');
          }

          setSuccessMessage('Morador registrado com sucesso!');
          // Limpar os campos após sucesso
          setNome('');
          setEmail('');
          setPassword(''); // Limpar o campo password
          setAddress('');  // Limpar o campo address
          setCep('');
      } catch (error) {
          setErrorMessage(error.message);
      }
  };

  const handleCepChange = (e) => {
      const cepValue = e.target.value;
      setCep(cepValue);

      // Buscar o endereço automaticamente quando o CEP tiver 8 dígitos
      if (cepValue.length === 8) {
          buscarEnderecoViaCep(cepValue);
      } else {
          setAddress(''); // Limpa o campo de address se o CEP estiver incompleto
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
            <input type="text" value={address} />
          </div>
        )}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit" className='botao_registrar'>Registrar</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
