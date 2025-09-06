package com.culturafm.site.entities;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "tb_event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_name")
    private String eventName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @Column(name = "image_url", length = 1024)
    private String imageUrl;

    @Column(name = "event_date")
    private Instant eventDate;
    
    @Column(name = "finish_date")
    private Instant finishDate; // Data final do evento (opcional)

    public Event() {
    }

    public Event(Long id, String eventName, String description, String location, String imageUrl, Instant eventDate) {
        this.id = id;
        this.eventName = eventName;
        this.description = description;
        this.location = location;
        this.imageUrl = imageUrl;
        this.eventDate = eventDate;
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
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}