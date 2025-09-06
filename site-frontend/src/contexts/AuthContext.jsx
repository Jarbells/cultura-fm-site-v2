import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState(
        // Tenta carregar os dados do localStorage ao iniciar
        () => JSON.parse(localStorage.getItem('authData'))
    );

    const login = (username, password) => {
        // btoa() codifica as credenciais para o formato Basic Auth
        const encodedCredentials = btoa(`${username}:${password}`);
        
        // Guarda os dados codificados
        const newAuthData = { basicAuth: `Basic ${encodedCredentials}` };

        // Armazena no localStorage para persistir o login
        localStorage.setItem('authData', JSON.stringify(newAuthData));
        setAuthData(newAuthData);
    };

    const logout = () => {
        localStorage.removeItem('authData');
        setAuthData(null);
        // Limpa a configuração do axios ao fazer logout
        delete axios.defaults.headers.common['Authorization'];
    };

    // Configura o cabeçalho de autorização do axios sempre que authData mudar
    if (authData) {
        axios.defaults.headers.common['Authorization'] = authData.basicAuth;
    }

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar o contexto facilmente
export function useAuth() {
    return useContext(AuthContext);
}