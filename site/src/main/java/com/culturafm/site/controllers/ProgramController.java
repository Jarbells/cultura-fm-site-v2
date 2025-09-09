// src/main/java/com/culturafm/site/controllers/ProgramController.java

package com.culturafm.site.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // 1. Importe a classe Page
import org.springframework.data.domain.Pageable; // 2. Importe a classe Pageable
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

import com.culturafm.site.dto.ProgramDTO;
import com.culturafm.site.services.ProgramService;

@RestController
@RequestMapping(value = "/api/programas")
public class ProgramController {

	@Autowired
	private ProgramService programService;
	
	// A CORREÇÃO ESTÁ AQUI
	@GetMapping
	public ResponseEntity<Page<ProgramDTO>> findAll(Pageable pageable) { // 3. Adicione o parâmetro Pageable
		Page<ProgramDTO> page = programService.findAll(pageable); // 4. Passe o pageable para o serviço
		return ResponseEntity.ok().body(page);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<ProgramDTO> findById(@PathVariable Long id) {
		ProgramDTO dto = programService.findById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<ProgramDTO> insert(@RequestBody ProgramDTO dto) {
		dto = programService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<ProgramDTO> update(@PathVariable Long id, @RequestBody ProgramDTO dto) {
		dto = programService.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		programService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
