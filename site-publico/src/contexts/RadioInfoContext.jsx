// src/contexts/RadioInfoContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Cria o Contexto
const RadioInfoContext = createContext(null);

// 2. Cria o "Provedor" que irá buscar e fornecer os dados
export function RadioInfoProvider({ children }) {
    const [radioInfo, setRadioInfo] = useState(null);

    useEffect(() => {
        axios.get('/api/radio-info')
            .then(response => {
                setRadioInfo(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar as informações da rádio!", error);
            });
    }, []);

    return (
        <RadioInfoContext.Provider value={radioInfo}>
            {children}
        </RadioInfoContext.Provider>
    );
}

// 3. Cria um "hook" personalizado para facilitar o uso do contexto
export function useRadioInfo() {
    return useContext(RadioInfoContext);
}
