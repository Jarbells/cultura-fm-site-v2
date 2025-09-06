// src/pages/ManageRadioInfo.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RadioInfoForm from '../components/RadioInfoForm';

function ManageRadioInfo() {
    const [radioInfo, setRadioInfo] = useState(null);

    const fetchRadioInfo = () => {
        axios.get('/api/radio-info')
            .then(response => {
                setRadioInfo(response.data);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar as informações da rádio!", error);
            });
    };

    useEffect(() => {
        fetchRadioInfo();
    }, []);

    const handleSave = (updatedInfo) => {
        // A CORREÇÃO CRUCIAL ESTÁ AQUI:
        // Garantimos que o URL inclui o ID da informação que estamos a atualizar.
        // O objeto 'updatedInfo' já contém o ID que veio da API.
        axios.put(`/api/radio-info/${updatedInfo.id}`, updatedInfo)
            .then(() => {
                alert('Informações da rádio atualizadas com sucesso!');
                fetchRadioInfo();
            })
            .catch(error => {
                if (error.response) {
                    console.error("Erro do servidor:", error.response.status, error.response.data);
                }
                alert('Erro ao atualizar as informações.');
                console.error("Houve um erro ao atualizar as informações!", error);
            });
    };

    if (!radioInfo) {
        return <div>A carregar informações da rádio...</div>;
    }

    return (
        <div>
            <RadioInfoForm 
                initialData={radioInfo}
                onSave={handleSave}
            />
        </div>
    );
}

export default ManageRadioInfo;
