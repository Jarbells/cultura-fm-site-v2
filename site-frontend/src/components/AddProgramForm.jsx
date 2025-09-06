// src/components/AddProgramForm.jsx

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

function AddProgramForm({ onProgramAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        imageUrls: [],
        announcers: [],
        additionalInfo: '' 
    });
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
            .catch(error => {
                console.error("Erro ao buscar locutores para o formulário!", error);
            });
    }, []);

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

        if (isChecked) {
            setFormData(prev => ({ ...prev, announcers: [...prev.announcers, { id: locutorId }] }));
        } else {
            setFormData(prev => ({
                ...prev,
                announcers: prev.announcers.filter(locutor => locutor.id !== locutorId)
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
            imageUrls: formData.imageUrls.filter(url => url.trim() !== '')
        };

        axios.post('/api/programas', dataToSend)
            .then(() => {
                alert('Programa cadastrado com sucesso!');
                onProgramAdded();
                setFormData({ name: '', startTime: '', endTime: '', imageUrls: [], announcers: [], additionalInfo: '' });
                setSelectedDays([]);
            })
            .catch(error => {
                console.error("Erro ao cadastrar programa!", error);
                const errorMsg = error.response?.data?.message || 'Erro ao cadastrar o programa.';
                alert(errorMsg);
            });
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Programa</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Programa:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Horário de Fim:</label>
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label>Informações Adicionais (Opcional):</label>
                    <input 
                        type="text" 
                        name="additionalInfo" 
                        value={formData.additionalInfo} 
                        onChange={handleChange} 
                        placeholder="Ex: Da Catedral Jesus, Maria e José"
                    />
                </div>

                <div className="form-group">
                    <label>URLs das Imagens de Fundo (uma por linha):</label>
                    <textarea 
                        name="imageUrls"
                        value={formData.imageUrls.join('\n')}
                        onChange={handleImageUrlsChange}
                        rows="4"
                        placeholder={`https://exemplo.com/imagem1.jpg\nhttps://exemplo.com/imagem2.jpg`}
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
                                    onChange={handleLocutorChange}
                                    checked={formData.announcers.some(a => a.id === locutor.id)}
                                />
                                {locutor.name}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Cadastrar Programa</button>
            </form>
        </div>
    );
}

export default AddProgramForm;