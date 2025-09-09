import React from 'react';
import './LoginPage.css';

function LoginPage() {
    const handleLogin = () => {
        // Volta para o URL original do Spring Security
        window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Painel Administrativo</h2>
                <p>Por favor, faça o login para continuar.</p>
                <button onClick={handleLogin} className="login-button">
                    Entrar com o Sistema Central
                </button>
            </div>
        </div>
    );
}

export default LoginPage;