import { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');

    const handleCepChange = (e) => {
        const newCep = e.target.value.replace(/\D/g, '');
        setCep(newCep);
        if (newCep.length === 8) {
            fetch(`https://viacep.com.br/ws/${newCep}/json/`)
                .then(response => response.json())
                .then(data => {
                    setAddress(`${data.logradouro}, ${data.localidade} - ${data.uf}`);
                })
                .catch(error => console.error('Erro ao buscar o endereço:', error));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, address })
            });
            const data = await response.json();
            // Lógica para lidar com a resposta, como redirecionar o usuário
            console.log(data);
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    };

    return (
        <div className="registration-form-container">
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
