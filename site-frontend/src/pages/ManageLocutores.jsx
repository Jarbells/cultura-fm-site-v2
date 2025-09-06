// src/pages/ManageLocutores.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocutorList from '../components/LocutorList';
import AddLocutorForm from '../components/AddLocutorForm';
import EditLocutorForm from '../components/EditLocutorForm';

function ManageLocutores() {
  const [locutores, setLocutores] = useState([]);
  const [editingLocutor, setEditingLocutor] = useState(null);

  const fetchLocutores = () => {
    axios.get('/api/locutores')
      .then(response => setLocutores(response.data.content))
      .catch(error => console.error("Houve um erro ao buscar os locutores!", error));        
  };

  useEffect(() => {
    fetchLocutores();
  }, []);

  const handleDeleteLocutor = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este locutor?')) {
      axios.delete(`/api/locutores/${id}`)
        .then(() => {
          alert('Locutor excluído com sucesso!');
          fetchLocutores();
        })
        .catch(error => {
          // --- AQUI ESTÁ A MUDANÇA ---
          // Verificamos se o erro tem uma resposta do servidor e uma mensagem
          if (error.response && error.response.data && error.response.data.message) {
            // Se tiver, mostramos a mensagem específica do backend
            alert(`Erro: ${error.response.data.message}`);
          } else {
            // Senão, mostramos uma mensagem genérica
            alert('Ocorreu um erro ao excluir o locutor.');
          }
          console.error("Houve um erro ao excluir o locutor!", error);
        });
    }
  };

  const handleUpdateLocutor = (id, updatedLocutor) => {
    axios.put(`/api/locutores/${id}`, updatedLocutor)
      .then(() => {
        alert('Locutor atualizado com sucesso!');
        setEditingLocutor(null);
        fetchLocutores();
      })
      .catch(error => console.error("Houve um erro ao atualizar o locutor!", error));
  };

  const handleEditClick = (locutor) => {
    setEditingLocutor(locutor);
  };

  const handleCancelEdit = () => {
    setEditingLocutor(null);
  };

  return (
    <div>
      {editingLocutor ? (
        <EditLocutorForm 
          locutorToEdit={editingLocutor}
          onUpdate={handleUpdateLocutor}
          onCancel={handleCancelEdit}
        />
      ) : (
        <AddLocutorForm onLocutorAdded={fetchLocutores} />
      )}
      <hr />
      <LocutorList 
        locutores={locutores} 
        onEdit={handleEditClick}
        onDelete={handleDeleteLocutor} 
      /> 
    </div>
  );
}

export default ManageLocutores;