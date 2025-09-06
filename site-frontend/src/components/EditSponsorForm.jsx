// src/components/EditSponsorForm.jsx

import React, { useState, useEffect } from 'react';

function EditSponsorForm({ sponsorToEdit, onUpdate, onCancel }) {
    const [formData, setFormData] = useState(sponsorToEdit);

    useEffect(() => {
        setFormData(sponsorToEdit);
    }, [sponsorToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData.id, formData);
    };

    return (
        <div className="form-container">
            <h2>Editar Patrocinador</h2>
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
                    <label>Ordem de Exibição:</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditSponsorForm;