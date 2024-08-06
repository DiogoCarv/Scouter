// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');

    const handleCepChange = (e) => {
        const newCep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        setCep(newCep);
        if (newCep.length === 8) {
            // Fazer a busca automática do endereço com base no CEP
            fetch(`https://viacep.com.br/ws/${newCep}/json/`)
                .then(response => response.json())
                .then(data => {
                    setAddress(`${data.logradouro}, ${data.localidade} - ${data.uf}`);
                })
                .catch(error => console.error('Erro ao buscar o endereço:', error));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para registrar o usuário
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
