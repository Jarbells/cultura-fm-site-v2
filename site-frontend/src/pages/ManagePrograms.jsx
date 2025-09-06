// src/pages/ManagePrograms.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgramList from '../components/ProgramList';
import AddProgramForm from '../components/AddProgramForm';
import EditProgramForm from '../components/EditProgramForm';

function ManagePrograms() {
    const [programs, setPrograms] = useState([]);
    const [editingProgram, setEditingProgram] = useState(null);

    const fetchPrograms = () => {
        axios.get('/api/programas?size=200&sort=startTime,asc')
            .then(response => {
                setPrograms(response.data.content);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os programas!", error);
            });
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleDeleteProgram = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este programa?')) {
            axios.delete(`/api/programas/${id}`)
                .then(() => {
                    alert('Programa excluído com sucesso!');
                    fetchPrograms();
                })
                .catch(error => {
                    console.error("Erro ao excluir o programa!", error);
                    alert('Erro ao excluir o programa.');
                });
        }
    };

    const handleUpdateProgram = (id, updatedProgram) => {
        axios.put(`/api/programas/${id}`, updatedProgram)
            .then(() => {
                alert('Programa atualizado com sucesso!');
                setEditingProgram(null);
                fetchPrograms();
            })
            .catch(error => {
                console.error("Erro ao atualizar o programa!", error);
                alert('Erro ao atualizar o programa.');
            });
    };

    const handleEditClick = (program) => {
        setEditingProgram(program);
    };

    const handleCancelEdit = () => {
        setEditingProgram(null);
    };

    return (
        <div>
            {editingProgram ? (
                <EditProgramForm
                    programToEdit={editingProgram}
                    onUpdate={handleUpdateProgram}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <AddProgramForm onProgramAdded={fetchPrograms} />
            )}
            <hr />
            <ProgramList 
                programs={programs} 
                onEdit={handleEditClick}
                onDelete={handleDeleteProgram}
            />
        </div>
    );
}

export default ManagePrograms;