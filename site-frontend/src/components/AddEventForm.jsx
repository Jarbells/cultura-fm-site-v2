import React, { useState } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor'; // 1. Importe o editor

function AddEventForm({ onEventAdded }) {
    const [formData, setFormData] = useState({
        eventName: '',
        description: '', // O conteúdo agora será HTML
        location: '',
        imageUrl: '',
        startDate: '',
        startTime: '',
        finishDate: '',
        finishTime: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Adicione o handler para o conteúdo do editor
    const handleDescriptionChange = (newDescription) => {
        setFormData(prev => ({ ...prev, description: newDescription }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const eventDate = formData.startDate ? new Date(`${formData.startDate}T${formData.startTime || '00:00'}`).toISOString() : null;
        const finishDate = formData.finishDate ? new Date(`${formData.finishDate}T${formData.finishTime || '00:00'}`).toISOString() : null;

        const dataToSend = { ...formData, eventDate, finishDate };
        delete dataToSend.startDate;
        delete dataToSend.startTime;
        delete dataToSend.finishDate;
        delete dataToSend.finishTime;

        axios.post('/api/events', dataToSend)
            .then(() => {
                alert('Evento cadastrado com sucesso!');
                onEventAdded();
                setFormData({ eventName: '', description: '', location: '', imageUrl: '', startDate: '', startTime: '', finishDate: '', finishTime: '' });
            })
            .catch(error => {
                console.error("Erro ao cadastrar evento!", error);
                alert('Erro ao cadastrar o evento.');
            });
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Evento</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Evento:</label>
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Local:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Data de Início:</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </div>
                 <div className="form-group">
                    <label>Hora de Início (Opcional):</label>
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Data Final (Opcional):</label>
                    <input type="date" name="finishDate" value={formData.finishDate} onChange={handleChange} />
                </div>
                 <div className="form-group">
                    <label>Hora Final (Opcional):</label>
                    <input type="time" name="finishTime" value={formData.finishTime} onChange={handleChange} />
                </div>
                
                {/* 3. Substitua o <textarea> pelo <TextEditor> */}
                <div className="form-group">
                    <label>Descrição:</label>
                    <TextEditor 
                        content={formData.description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div className="form-group">
                    <label>URL da Imagem de Divulgação:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <button type="submit">Publicar Evento</button>
            </form>
        </div>
    );
}

export default AddEventForm;