import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // O estado agora é mais simples: ou está autenticado ou não.
    // 'null' significa que ainda não verifiquei.
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkAuthStatus = useCallback(async () => {
        try {
            // Tentamos aceder a um endpoint protegido. Se funcionar, o utilizador tem uma sessão válida.
            // Usamos /api/user que é um endpoint padrão do Spring Security OAuth2.
            await axios.get('/api/user'); 
            setIsAuthenticated(true);
        } catch (error) {
            // Se der erro (401 Unauthorized), o utilizador não está logado.
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = () => {
        // A função de login agora simplesmente redireciona o browser para o endpoint do backend.
        // O backend cuidará do redirecionamento para o Auth0.
        window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    };

    const logout = () => {
        // Idealmente, o logout também seria um endpoint no backend.
        // Por agora, vamos apenas limpar o estado.
        setIsAuthenticated(false);
        // Pode adicionar um redirecionamento para uma página de logout do Auth0 se desejar.
    };

    const value = { isAuthenticated, login, logout };

    // Não renderiza nada até sabermos o status da autenticação
    if (isAuthenticated === null) {
        return <div>A verificar autenticação...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}