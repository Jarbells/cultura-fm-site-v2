// src/pages/ManageNews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from '../components/NewsList';
import AddNewsForm from '../components/AddNewsForm';
import EditNewsForm from '../components/EditNewsForm';

function ManageNews() {
    // 1. O estado agora armazena o objeto de página completo
    const [newsPage, setNewsPage] = useState({ content: [], number: 0, totalPages: 0 });
    const [editingNews, setEditingNews] = useState(null);

    // 2. A função agora aceita um número de página
    const fetchNews = (page = 0) => {
        // Vamos definir um tamanho de página menor para o painel, por exemplo, 5
        axios.get(`/api/news?page=${page}&size=5&sort=publicationDate,desc`)
            .then(response => {
                setNewsPage(response.data); // Armazena o objeto de página inteiro
            })
            .catch(error => {
                console.error("Houve um erro ao buscar as notícias!", error);
            });
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // ... (as funções handleDelete, handleUpdate, etc. não mudam)
    const handleDeleteNews = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
            axios.delete(`/api/news/${id}`)
                .then(() => {
                    alert('Notícia excluída com sucesso!');
                    // Recarrega a página atual após a exclusão
                    fetchNews(newsPage.number);
                })
                .catch(error => {
                    alert('Erro ao excluir a notícia.');
                    console.error("Houve um erro ao excluir a notícia!", error);
                });
        }
    };
    
    const handleUpdateNews = (id, updatedNews) => {
        axios.put(`/api/news/${id}`, updatedNews)
            .then(() => {
                alert('Notícia atualizada com sucesso!');
                setEditingNews(null);
                fetchNews(newsPage.number);
            })
            .catch(error => {
                alert('Erro ao atualizar a notícia.');
                console.error("Houve um erro ao atualizar a notícia!", error);
            });
    };

    const handleEditClick = (news) => {
        setEditingNews(news);
    };

    const handleCancelEdit = () => {
        setEditingNews(null);
    };


    return (
        <div>
            {editingNews ? (
                <EditNewsForm 
                    newsToEdit={editingNews}
                    onUpdate={handleUpdateNews}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <AddNewsForm onNewsAdded={() => fetchNews(0)} />
            )}
            <hr />
            {/* 3. Passamos a lista de notícias (newsPage.content) para o componente NewsList */}
            <NewsList 
                newsItems={newsPage.content}
                onDelete={handleDeleteNews}
                onEdit={handleEditClick}
            />

            {/* 4. Adicionamos os controlos de paginação */}
            <div className="pagination-controls">
                <button 
                    onClick={() => fetchNews(newsPage.number - 1)} 
                    disabled={newsPage.first}
                >
                    Anterior
                </button>
                <span>
                    Página {newsPage.number + 1} de {newsPage.totalPages}
                </span>
                <button 
                    onClick={() => fetchNews(newsPage.number + 1)} 
                    disabled={newsPage.last}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default ManageNews;