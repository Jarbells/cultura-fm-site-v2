// src/main/java/com/culturafm/site/services/NewsService.java
package com.culturafm.site.services;

import com.culturafm.site.dto.NewsDTO;
import com.culturafm.site.entities.News;
import com.culturafm.site.repository.NewsRepository;
import com.culturafm.site.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.Instant;

@Service
public class NewsService {

    @Autowired
    private NewsRepository repository;
    
    // 2. Injete o template de mensagens
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Transactional(readOnly = true)
    public Page<NewsDTO> findAll(Pageable pageable) {
        Page<News> page = repository.findAll(pageable);
        return page.map(NewsDTO::new);
    }

    @Transactional(readOnly = true)
    public NewsDTO findById(Long id) {
        News entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notícia não encontrada com o ID: " + id));
        return new NewsDTO(entity);
    }

    @Transactional
    public NewsDTO insert(NewsDTO dto) {
        News entity = new News();
        copyDtoToEntity(dto, entity);
        // Garante que a data de publicação seja a data atual ao criar
        if (entity.getPublicationDate() == null) {
            entity.setPublicationDate(Instant.now());
        }
        entity = repository.save(entity);
        
        // 3. Envia a mensagem de atualização após salvar
        messagingTemplate.convertAndSend("/topic/news", "updated");
        
        return new NewsDTO(entity);
    }

    @Transactional
    public NewsDTO update(Long id, NewsDTO dto) {
        try {
            News entity = repository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            
            // 4. Envie a mensagem de atualização após atualizar
            messagingTemplate.convertAndSend("/topic/news", "updated");
            
            return new NewsDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não foi possível atualizar. Notícia não encontrada com o ID: " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
            
            // 5. Envie a mensagem de atualização após deletar
            messagingTemplate.convertAndSend("/topic/news", "updated");
            
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Não foi possível deletar. Notícia não encontrada com o ID: " + id);
        }
    }

    private void copyDtoToEntity(NewsDTO dto, News entity) {
        entity.setTitle(dto.getTitle());
        entity.setSubtitle(dto.getSubtitle());
        entity.setContent(dto.getContent());
        entity.setAuthor(dto.getAuthor());
        entity.setImageUrl(dto.getImageUrl());
        entity.setPublicationDate(dto.getPublicationDate());
        entity.setSource(dto.getSource());
        entity.setImageCredit(dto.getImageCredit());
    }
}
