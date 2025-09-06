// src/components/ProgramList.jsx

import React from 'react';
import './ProgramList.css';

// 1. Receba a nova propriedade 'onEdit'
function ProgramList({ programs, onEdit, onDelete }) {

    const formatTime = (time) => {
        if (!time) return '';
        return time.substring(0, 5);
    };

    return (
        <div className="program-list-container">
            <h2>Grade de Programação</h2>
            <div className="program-list">
                {Array.isArray(programs) && programs.map(program => (
                    <div key={program.id} className="program-card">
                        <div className="program-time">
                            {formatTime(program.startTime)} - {formatTime(program.endTime)}
                        </div>
                        <div className="program-details">
                            <h3 className="program-name">{program.name}</h3>
                            <p className="program-days">{program.daysOfWeek}</p>
                            <p className="program-announcers">
                                {program.announcers.map(announcer => announcer.name).join(', ')}
                            </p>
                        </div>
                        <div className="program-actions">
                            {/* 2. Conecte o onClick à função onEdit */}
                            <button className="btn-edit" onClick={() => onEdit(program)}>Editar</button>
                            <button className="btn-delete" onClick={() => onDelete(program.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgramList;