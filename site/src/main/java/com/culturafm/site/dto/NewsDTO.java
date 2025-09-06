package com.culturafm.site.dto;

import com.culturafm.site.entities.News;
import org.springframework.beans.BeanUtils;

import java.time.Instant;

public class NewsDTO {

    private Long id;
    private String title;
    private String subtitle;
    private String content;
    private String author;
    private String imageUrl;
    private Instant publicationDate;
    private String source;
    private String imageCredit;

    public NewsDTO() {
    }

    public NewsDTO(News entity) {
        BeanUtils.copyProperties(entity, this);
    }

    // Getters e Setters
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
	public String getSource() {	return source; }
	public void setSource(String source) { this.source = source; }
	public String getImageCredit() { return imageCredit; }
	public void setImageCredit(String imageCredit) { this.imageCredit = imageCredit; }
}
