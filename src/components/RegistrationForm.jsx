import { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para buscar o endereço pelo CEP usando a API do ViaCEP
  const buscarEnderecoViaCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

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
    if (!nome || !email || !password || !cep || !address) {
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
      const response = await axios.post('http://localhost:5000/morador/register', {
        nome,
        email,
        password,
        address,
        cep
      });

      if (response.status === 201) {  // Verifique se o status da resposta é 201 (Criado)
        setSuccessMessage('Cadastro realizado com sucesso!');
        setNome('');
        setEmail('');
        setPassword(''); // Limpar o campo password
        setAddress('');  // Limpar o campo address
        setCep('');
      } else {
        setErrorMessage('Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Erro ao registrar. Tente novamente.');
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

          <label className='label'>Nome:</label>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

        </div>

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
          <div className='label-divisao'>
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

export default RegistrationForm;
