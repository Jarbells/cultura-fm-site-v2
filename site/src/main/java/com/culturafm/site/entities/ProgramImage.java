// src/main/java/com/culturafm/site/entities/ProgramImage.java

package com.culturafm.site.entities;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_program_image")
public class ProgramImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url", length = 1024)
    private String imageUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    public ProgramImage() {
    }

    public ProgramImage(Long id, String imageUrl, Program program) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.program = program;
    }

    // Getters e Setters (sem alterações)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Program getProgram() { return program; }
    public void setProgram(Program program) { this.program = program; }

    // A CORREÇÃO ESTÁ AQUI:
    // O hashCode e o equals agora baseiam-se numa combinação única
    // do programa e do URL da imagem, e não apenas no ID.
    @Override
    public int hashCode() {
        return Objects.hash(program, imageUrl);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProgramImage other = (ProgramImage) obj;
        return Objects.equals(program, other.program) && Objects.equals(imageUrl, other.imageUrl);
    }
}
