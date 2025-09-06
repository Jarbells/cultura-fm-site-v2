// src/components/AddLocutorForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// O componente agora recebe a função 'onLocutorAdded' como uma propriedade
function AddLocutorForm({ onLocutorAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        photoUrl: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.name.trim()) {
            alert('Por favor, preencha o nome do locutor.');
            return;
        }

        const apiUrl = '/api/locutores';

        axios.post(apiUrl, formData)
            .then(response => {
                alert('Locutor cadastrado com sucesso!');
                setFormData({ name: '', bio: '', photoUrl: '' });
                
                // AQUI ESTÁ A MÁGICA!
                // Chamamos a função que o componente App nos passou.
                // Isso vai fazer o App buscar a lista de locutores novamente.
                onLocutorAdded();
            })
            .catch(error => {
                console.error("Houve um erro ao cadastrar o locutor!", error);
                alert('Erro ao cadastrar o locutor. Verifique o console.');
            });
    };

    // O JSX do formulário continua exatamente o mesmo
    return (
        <div className="form-container">
            <h2>Adicionar Novo Locutor</h2>
            <form onSubmit={handleSubmit}>
                {/* ... todo o seu código de inputs e button ... */}
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio (Programa que apresenta):</label>
                    <input type="text" id="bio" name="bio" value={formData.bio} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="photoUrl">URL da Foto:</label>
                    <input type="text" id="photoUrl" name="photoUrl" value={formData.photoUrl} onChange={handleChange} />
                </div>
                <button type="submit">Cadastrar Locutor</button>
            </form>
        </div>
    );
}

export default AddLocutorForm;