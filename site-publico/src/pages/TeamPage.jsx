// src/pages/TeamPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamPage.css'; 

function TeamPage() {
    const [locutores, setLocutores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Busca todos os locutores, ordenados por nome
        axios.get('/api/locutores?sort=name,asc')
            .then(response => {
                setLocutores(response.data.content);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar a equipa de locutores!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar equipe...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white mb-8 border-l-4 border-[#FFA500] pl-4">Nossa Equipe</h1>
            
            <div className="team-grid">
                {locutores.map(locutor => (
                    <div key={locutor.id} className="team-card">
                        <img 
                            src={locutor.photoUrl || 'https://placehold.co/400x400/181818/ffffff?text=Foto'} 
                            alt={`Foto de ${locutor.name}`}
                            className="team-photo"
                        />
                        <div className="team-info">
                            <h3 className="team-name">{locutor.name}</h3>
                            <p className="team-bio">{locutor.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default TeamPage;