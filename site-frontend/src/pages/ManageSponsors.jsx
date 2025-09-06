// src/pages/ManageSponsors.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SponsorList from '../components/SponsorList';
import AddSponsorForm from '../components/AddSponsorForm';
import EditSponsorForm from '../components/EditSponsorForm';

function ManageSponsors() {
    const [sponsors, setSponsors] = useState([]);
    const [editingSponsor, setEditingSponsor] = useState(null);

    const fetchSponsors = () => {
        axios.get('/api/sponsors')
            .then(response => {
                setSponsors(response.data.content);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os patrocinadores!", error);
            });
    };

    useEffect(() => {
        fetchSponsors();
    }, []);

    const handleDeleteSponsor = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este patrocinador?')) {
            axios.delete(`/api/sponsors/${id}`)
                .then(() => {
                    alert('Patrocinador excluído com sucesso!');
                    fetchSponsors();
                })
                .catch(error => {
                    alert('Erro ao excluir o patrocinador.');
                    console.error("Houve um erro ao excluir o patrocinador!", error);
                });
        }
    };

    const handleUpdateSponsor = (id, updatedSponsor) => {
        axios.put(`/api/sponsors/${id}`, updatedSponsor)
            .then(() => {
                alert('Patrocinador atualizado com sucesso!');
                setEditingSponsor(null);
                fetchSponsors();
            })
            .catch(error => {
                alert('Erro ao atualizar o patrocinador.');
                console.error("Houve um erro ao atualizar o patrocinador!", error);
            });
    };

    const handleEditClick = (sponsor) => {
        setEditingSponsor(sponsor);
    };

    const handleCancelEdit = () => {
        setEditingSponsor(null);
    };

    return (
        <div>
            {editingSponsor ? (
                <EditSponsorForm 
                    sponsorToEdit={editingSponsor}
                    onUpdate={handleUpdateSponsor}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <AddSponsorForm onSponsorAdded={fetchSponsors} />
            )}
            <hr />
            <SponsorList 
                sponsors={sponsors}
                onDelete={handleDeleteSponsor}
                onEdit={handleEditClick}
            />
        </div>
    );
}

export default ManageSponsors;