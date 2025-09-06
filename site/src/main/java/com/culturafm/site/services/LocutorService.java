// src/main/java/com/culturafm/site/services/LocutorService.java

package com.culturafm.site.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.culturafm.site.dto.LocutorDTO;
import com.culturafm.site.entities.Locutor;
import com.culturafm.site.repository.LocutorRepository;
import com.culturafm.site.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LocutorService {

    @Autowired
    private LocutorRepository repository;

    @Transactional(readOnly = true)
    public Page<LocutorDTO> findAll(Pageable pageable) {
        Page<Locutor> page = repository.findAll(pageable);
        return page.map(LocutorDTO::new);
    }    
    
    /* @Transactional(readOnly = true)
    public List<LocutorDTO> findAll() {
        List<Locutor> list = repository.findAll();
        return list.stream().map(LocutorDTO::new).collect(Collectors.toList());
    } */

    @Transactional(readOnly = true)
    public LocutorDTO findById(Long id) {
        Optional<Locutor> obj = repository.findById(id);
        Locutor entity = obj.orElseThrow(() -> new ResourceNotFoundException("Locutor não encontrado com o ID: " + id));
        return new LocutorDTO(entity);
    }

    @Transactional
    public LocutorDTO insert(LocutorDTO dto) {
        Locutor entity = new Locutor();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new LocutorDTO(entity);
    }

    @Transactional
    public LocutorDTO update(Long id, LocutorDTO dto) {
        try {
            Locutor entity = repository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new LocutorDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não foi possível atualizar. Locutor não encontrado com o ID: " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Não foi possível deletar. Locutor não encontrado com o ID: " + id);
        }
        // Nota: Se um locutor estiver associado a um programa, a deleção pode falhar
        // devido a restrições de chave estrangeira. Podemos adicionar um tratamento
        // para DataIntegrityViolationException aqui no futuro, se necessário.
    }

    // Método auxiliar para copiar os dados do DTO para a entidade
    private void copyDtoToEntity(LocutorDTO dto, Locutor entity) {
        entity.setName(dto.getName());
        entity.setBio(dto.getBio());
        entity.setPhotoUrl(dto.getPhotoUrl());
    }
}