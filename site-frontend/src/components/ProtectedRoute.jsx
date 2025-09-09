import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para a página de login.
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;