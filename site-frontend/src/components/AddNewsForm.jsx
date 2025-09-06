import React, { useState } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor'; // 1. Importe o nosso novo componente

function AddNewsForm({ onNewsAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '', // O conteúdo será HTML
        author: '',
        imageUrl: '',
        source: '',
        imageCredit: '',
        publicationDate: new Date().toISOString(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Handler para as mudanças do editor
    const handleContentChange = (newContent) => {
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/news', formData)
            .then(() => {
                alert('Notícia cadastrada com sucesso!');
                onNewsAdded();
                setFormData({ title: '', subtitle: '', content: '', author: '', imageUrl: '', source: '', imageCredit: '', publicationDate: new Date().toISOString() });
            })
            .catch(error => {
                console.error("Erro ao cadastrar notícia!", error);
                alert('Erro ao cadastrar a notícia.');
            });
    };

    return (
        <div className="form-container">
            <h2>Adicionar Nova Notícia</h2>
            <form onSubmit={handleSubmit}>
                {/* ... (outros campos do formulário) ... */}
                <div className="form-group">
                    <label>Título:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Subtítulo:</label>
                    <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
                </div>
                
                {/* 3. Use o componente TextEditor aqui */}
                <div className="form-group">
                    <label>Conteúdo:</label>
                    <TextEditor
                        content={formData.content}
                        onChange={handleContentChange}
                    />
                </div>
                
                {/* ... (resto dos campos do formulário) ... */}
                <div className="form-group">
                    <label>Autor:</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>URL da Imagem de Capa:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Fonte da Notícia (ex: G1, O Povo):</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Créditos da Imagem (ex: Foto: João Silva):</label>
                    <input type="text" name="imageCredit" value={formData.imageCredit} onChange={handleChange} />
                </div>

                <button type="submit">Publicar Notícia</button>
            </form>
        </div>
    );
}

export default AddNewsForm;