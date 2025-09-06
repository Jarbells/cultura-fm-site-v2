// src/components/LocutorList.jsx

import React from 'react';
import './LocutorList.css';

// 1. O componente agora também receberá uma função 'onEdit'
function LocutorList({ locutores, onEdit, onDelete }) {
    return (
        <div className="locutor-list-container">
            <h2>Lista de Locutores</h2>
            <ul className="locutor-list">
                {locutores.map(locutor => (
                    <li key={locutor.id} className="locutor-item">
                        <div>
                            <span className="locutor-name">{locutor.name}</span>
                            <span className="locutor-bio">- ({locutor.bio})</span>
                        </div>
                        <div className="locutor-actions">
                            {/* 2. Adicionamos a ação de clique ao botão Editar */}
                            <button className="btn-edit" onClick={() => onEdit(locutor)}>
                                Editar
                            </button>
                            <button className="btn-delete" onClick={() => onDelete(locutor.id)}>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LocutorList;