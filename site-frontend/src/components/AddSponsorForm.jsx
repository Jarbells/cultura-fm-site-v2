// src/components/AddSponsorForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function AddSponsorForm({ onSponsorAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        logoUrl: '',
        websiteUrl: '',
        displayOrder: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/sponsors', formData)
            .then(() => {
                alert('Patrocinador cadastrado com sucesso!');
                onSponsorAdded();
                setFormData({ name: '', logoUrl: '', websiteUrl: '', displayOrder: 0 });
            })
            .catch(error => {
                console.error("Erro ao cadastrar patrocinador!", error);
                alert('Erro ao cadastrar o patrocinador.');
            });
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Patrocinador</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Patrocinador:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>URL do Logótipo:</label>
                    <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Website (Opcional):</label>
                    <input type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Ordem de Exibição (menor aparece primeiro):</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                </div>
                <button type="submit">Adicionar Patrocinador</button>
            </form>
        </div>
    );
}

export default AddSponsorForm;