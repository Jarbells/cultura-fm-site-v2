// src/main/java/com/culturafm/site/dto/ProgramDTO.java

package com.culturafm.site.dto;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import com.culturafm.site.entities.Program;

public class ProgramDTO {

    private Long id;
    private String name;
    private String daysOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private List<String> imageUrls = new ArrayList<>();
    
    // NOVO CAMPO ADICIONADO
    private String additionalInfo;
    
    // NOVO CAMPO: Lista de LocutorDTO
    private List<LocutorDTO> announcers = new ArrayList<>();

    public ProgramDTO() {
    }
    
    public ProgramDTO(Program entity) {
        // Copia os campos simples (id, name, daysOfWeek, etc.)
        BeanUtils.copyProperties(entity, this, "images", "announcers");

        // Converte a coleção de ProgramImage em uma lista de Strings (URLs)
        this.imageUrls = entity.getImages().stream()
                                  .map(image -> image.getImageUrl())
                                  .collect(Collectors.toList());

        // Converte a coleção de Locutor (entidade) em uma lista de LocutorDTO
        this.announcers = entity.getAnnouncers().stream()
                                    .map(locutor -> new LocutorDTO(locutor))
                                    .collect(Collectors.toList());
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(String daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
    
    // GETTER E SETTER PARA O NOVO CAMPO
    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    // Getter e Setter para o novo campo de locutores
    public List<LocutorDTO> getAnnouncers() {
        return announcers;
    }

    public void setAnnouncers(List<LocutorDTO> announcers) {
        this.announcers = announcers;
    }
}