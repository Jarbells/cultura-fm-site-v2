package com.culturafm.site.dto;

import com.culturafm.site.entities.Event;
import org.springframework.beans.BeanUtils;

import java.time.Instant;

public class EventDTO {

    private Long id;
    private String eventName;
    private String description;
    private String location;
    private String imageUrl;
    private Instant eventDate;
    private Instant finishDate;

    public EventDTO() {
    }

    public EventDTO(Event entity) {
        BeanUtils.copyProperties(entity, this);
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Instant getEventDate() { return eventDate; }
    public void setEventDate(Instant eventDate) { this.eventDate = eventDate; }
    public Instant getFinishDate() { return finishDate; }
    public void setFinishDate(Instant finishDate) { this.finishDate = finishDate; }
}