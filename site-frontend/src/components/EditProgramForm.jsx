// src/components/EditProgramForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const daysOfWeekOptions = [
    { id: 'Segunda', label: 'Seg' },
    { id: 'Terça',   label: 'Ter' },
    { id: 'Quarta',  label: 'Qua' },
    { id: 'Quinta',  label: 'Qui' },
    { id: 'Sexta',   label: 'Sex' },
    { id: 'Sábado',  label: 'Sab' },
    { id: 'Domingo', label: 'Dom' }
];

function EditProgramForm({ programToEdit, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({ ...programToEdit });
    const [selectedDays, setSelectedDays] = useState([]);
    const [allLocutores, setAllLocutores] = useState([]);

    useEffect(() => {
        axios.get('/api/locutores?size=200')
            .then(response => {
                const sortedLocutores = response.data.content.sort((a, b) => 
                    a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
                );
                setAllLocutores(sortedLocutores);
            })
            .catch(error => console.error("Erro ao buscar locutores!", error));
    }, []);

    useEffect(() => {
        setFormData({
            ...programToEdit,
            startTime: programToEdit.startTime ? programToEdit.startTime.substring(0, 5) : '',
            endTime: programToEdit.endTime ? programToEdit.endTime.substring(0, 5) : '',
        });
        setSelectedDays(programToEdit.daysOfWeek ? programToEdit.daysOfWeek.split(',') : []);
    }, [programToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleDayChange = (dayId) => {
        setSelectedDays(prevDays =>
            prevDays.includes(dayId)
                ? prevDays.filter(d => d !== dayId)
                : [...prevDays, dayId]
        );
    };

    const handleImageUrlsChange = (e) => {
        const urls = e.target.value.split('\n');
        setFormData(prev => ({ ...prev, imageUrls: urls }));
    };

    const handleLocutorChange = (e) => {
        const locutorId = parseInt(e.target.value);
        const isChecked = e.target.checked;
        let currentAnnouncers = formData.announcers || [];

        if (isChecked) {
            const announcerToAdd = allLocutores.find(l => l.id === locutorId);
            if (announcerToAdd) {
                setFormData(prev => ({ ...prev, announcers: [...currentAnnouncers, announcerToAdd] }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                announcers: currentAnnouncers.filter(locutor => locutor.id !== locutorId)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectedDays.length === 0) {
            alert('Por favor, selecione pelo menos um dia da semana.');
            return;
        }

        const dataToSend = {
            ...formData,
            daysOfWeek: selectedDays.join(','),
            imageUrls: Array.isArray(formData.imageUrls) ? formData.imageUrls.filter(url => url && url.trim() !== '') : []
        };
        onUpdate(dataToSend.id, dataToSend);
    };

    const isLocutorChecked = (locutorId) => {
        return formData.announcers && formData.announcers.some(announcer => announcer.id === locutorId);
    };

    return (
        <div className="form-container">
            <h2>Editar Programa</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Programa:</label>
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label>Dias da Semana:</label>
                    <div className="checkbox-group-days">
                        {daysOfWeekOptions.map(day => (
                            <label key={day.id} className="day-label">
                                <span className="day-text">{day.label}</span>
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day.id)}
                                    onChange={() => handleDayChange(day.id)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Horário de Início:</label>
                    <input type="time" name="startTime" value={formData.startTime || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Horário de Fim:</label>
                    <input type="time" name="endTime" value={formData.endTime || ''} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Informações Adicionais (Opcional):</label>
                    <input 
                        type="text" 
                        name="additionalInfo" 
                        value={formData.additionalInfo || ''} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label>URLs das Imagens de Fundo (uma por linha):</label>
                    <textarea 
                        name="imageUrls"
                        value={Array.isArray(formData.imageUrls) ? formData.imageUrls.join('\n') : ''}
                        onChange={handleImageUrlsChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Locutores:</label>
                    <div className="checkbox-group">
                        {allLocutores.map(locutor => (
                            <label key={locutor.id}>
                                <input
                                    type="checkbox"
                                    value={locutor.id}
                                    checked={isLocutorChecked(locutor.id)}
                                    onChange={handleLocutorChange}
                                />
                                {locutor.name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditProgramForm;