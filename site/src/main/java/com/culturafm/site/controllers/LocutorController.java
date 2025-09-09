// src/main/java/com/culturafm/site/controllers/LocutorController.java

package com.culturafm.site.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.culturafm.site.dto.LocutorDTO;
import com.culturafm.site.services.LocutorService;

@RestController
@RequestMapping(value = "/api/locutores") // O endpoint base para tudo relacionado a locutores
// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class LocutorController {

    @Autowired
    private LocutorService service;

    @GetMapping
    public ResponseEntity<Page<LocutorDTO>> findAll(Pageable pageable) {
        Page<LocutorDTO> page = service.findAll(pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<LocutorDTO> findById(@PathVariable Long id) {
        LocutorDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<LocutorDTO> insert(@RequestBody LocutorDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<LocutorDTO> update(@PathVariable Long id, @RequestBody LocutorDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}