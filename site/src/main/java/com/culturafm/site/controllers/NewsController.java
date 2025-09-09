// 1. src/main/java/com/culturafm/site/controllers/NewsController.java

package com.culturafm.site.controllers;

import com.culturafm.site.dto.NewsDTO;
import com.culturafm.site.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/news")
// A CORREÇÃO ESTÁ AQUI: Adiciona a anotação CrossOrigin
// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class NewsController {

    @Autowired
    private NewsService service;

    @GetMapping
    public ResponseEntity<Page<NewsDTO>> findAll(Pageable pageable) {
        Page<NewsDTO> page = service.findAll(pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<NewsDTO> findById(@PathVariable Long id) {
        NewsDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<NewsDTO> insert(@RequestBody NewsDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<NewsDTO> update(@PathVariable Long id, @RequestBody NewsDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}