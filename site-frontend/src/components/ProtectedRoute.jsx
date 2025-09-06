import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { authData } = useAuth();

    if (!authData) {
        // Se não houver dados de autenticação, redireciona para a página de login
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;