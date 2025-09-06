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

import com.culturafm.site.dto.SponsorDTO;
import com.culturafm.site.services.SponsorService;

@RestController
@RequestMapping(value = "/sponsors")
// A CORREÇÃO ESTÁ AQUI: Adiciona a anotação CrossOrigin
// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class SponsorController {

    @Autowired
    private SponsorService service;

    @GetMapping
    public ResponseEntity<Page<SponsorDTO>> findAll(Pageable pageable) {
        Page<SponsorDTO> page = service.findAll(pageable);
        return ResponseEntity.ok().body(page);
    }
    
    /* @GetMapping
    public ResponseEntity<List<SponsorDTO>> findAll() {
        List<SponsorDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    } */

    @GetMapping(value = "/{id}")
    public ResponseEntity<SponsorDTO> findById(@PathVariable Long id) {
        SponsorDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<SponsorDTO> insert(@RequestBody SponsorDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<SponsorDTO> update(@PathVariable Long id, @RequestBody SponsorDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}