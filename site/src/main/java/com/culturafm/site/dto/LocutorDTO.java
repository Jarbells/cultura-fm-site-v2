// src/main/java/com/culturafm/site/dto/LocutorDTO.java

package com.culturafm.site.dto;

import org.springframework.beans.BeanUtils;

import com.culturafm.site.entities.Locutor;

public class LocutorDTO {

    private Long id;
    private String name;
    private String bio;
    private String photoUrl;

    public LocutorDTO() {
    }

    public LocutorDTO(Long id, String name, String bio, String photoUrl) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.photoUrl = photoUrl;
    }

    // Construtor que converte a entidade Locutor em um LocutorDTO
    public LocutorDTO(Locutor entity) {
        BeanUtils.copyProperties(entity, this);
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}