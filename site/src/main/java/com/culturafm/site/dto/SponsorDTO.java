package com.culturafm.site.dto;

import com.culturafm.site.entities.Sponsor;
import org.springframework.beans.BeanUtils;

public class SponsorDTO {

    private Long id;
    private String name;
    private String logoUrl;
    private String websiteUrl;
    private Integer displayOrder;

    public SponsorDTO() {
    }

    public SponsorDTO(Sponsor entity) {
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

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}