import React from 'react';
import './SponsorList.css'; 

function SponsorList({ sponsors, onEdit, onDelete }) {
    return (
        <div className="sponsor-list-container">
            <h2>Patrocinadores</h2>
            <div className="sponsor-grid">
                {sponsors.map(sponsor => (
                    <div key={sponsor.id} className="sponsor-card">
                        <div className="sponsor-logo-container">
                            <img 
                                src={sponsor.logoUrl || 'https://placehold.co/150x80/2e2e2e/ffffff?text=Sem+Logo'} 
                                alt={sponsor.name} 
                                className="sponsor-logo"
                            />
                        </div>
                        <div className="sponsor-info">
                            <h3 className="sponsor-name">{sponsor.name}</h3>
                            <a 
                                href={sponsor.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="sponsor-website"
                            >
                                {sponsor.websiteUrl ? 'Visitar Website' : 'Sem website'}
                            </a>
                        </div>
                        <div className="sponsor-actions">
                            <button className="btn-edit" onClick={() => onEdit(sponsor)}>Editar</button>
                            <button className="btn-delete" onClick={() => onDelete(sponsor.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SponsorList;