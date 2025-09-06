// src/main/java/com/culturafm/site/entities/News.java
package com.culturafm.site.entities;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "tb_news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author;

    @Column(name = "image_url", length = 1024)
    private String imageUrl;

    @Column(name = "publication_date")
    private Instant publicationDate;

    // --- NOVOS CAMPOS ---
    private String source; // Fonte da notícia

    @Column(name = "image_credit")
    private String imageCredit; // Créditos da imagem

    public News() {
    }

    // Getters e Setters para os novos campos
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getImageCredit() { return imageCredit; }
    public void setImageCredit(String imageCredit) { this.imageCredit = imageCredit; }

    // --- Getters e Setters existentes ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Instant getPublicationDate() { return publicationDate; }
    public void setPublicationDate(Instant publicationDate) { this.publicationDate = publicationDate; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        News news = (News) o;
        return Objects.equals(id, news.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
