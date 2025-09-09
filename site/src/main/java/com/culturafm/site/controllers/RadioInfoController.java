// src/main/java/com/culturafm/site/controllers/RadioInfoController.java
package com.culturafm.site.controllers;

import com.culturafm.site.dto.RadioInfoDTO;
import com.culturafm.site.services.RadioInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/radio-info")
// ANOTAÇÃO DE DEPURAÇÃO: Permite o acesso de QUALQUER origem.
// @CrossOrigin(origins = "*") 
public class RadioInfoController {

    @Autowired
    private RadioInfoService service;

    @GetMapping
    public ResponseEntity<RadioInfoDTO> getInfo() {
        RadioInfoDTO dto = service.getInfo();
        return ResponseEntity.ok().body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<RadioInfoDTO> updateInfo(@RequestBody RadioInfoDTO dto, @PathVariable Long id) {
        dto = service.updateInfo(dto);
        return ResponseEntity.ok().body(dto);
    }
}
