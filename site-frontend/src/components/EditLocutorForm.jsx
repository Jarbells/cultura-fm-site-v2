// src/components/EditLocutorForm.jsx

import React, { useState, useEffect } from 'react';

// O formulário recebe 3 props:
// - locutorToEdit: O objeto do locutor que estamos editando.
// - onUpdate: A função para chamar quando salvarmos.
// - onCancel: A função para chamar quando cancelarmos.
function EditLocutorForm({ locutorToEdit, onUpdate, onCancel }) {
    // O estado do formulário começa com os dados do locutor que recebemos
    const [formData, setFormData] = useState(locutorToEdit);

    // Este 'useEffect' garante que, se o usuário clicar em editar outro locutor
    // enquanto este formulário estiver aberto, os dados sejam atualizados.
    useEffect(() => {
        setFormData(locutorToEdit);
    }, [locutorToEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(formData.id, formData); // Chama a função de update do App.jsx
    };

    return (
        <div className="form-container">
            <h2>Editar Locutor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <input
                        type="text"
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photoUrl">URL da Foto:</label>
                    <input
                        type="text"
                        id="photoUrl"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                    {/* O botão de cancelar simplesmente chama a função onCancel */}
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditLocutorForm;