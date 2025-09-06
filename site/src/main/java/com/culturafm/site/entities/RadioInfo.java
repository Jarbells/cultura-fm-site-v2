// src/main/java/com/culturafm/site/entities/RadioInfo.java
package com.culturafm.site.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "tb_radio_info")
public class RadioInfo {

	@Id
	private Long id;

	// --- NOVOS CAMPOS DE IDENTIDADE ---
	@Column(name = "radio_name")
	private String radioName;

	private String slogan;

	@Column(name = "logo_url", length = 1024)
	private String logoUrl;

	// --- CAMPOS EXISTENTES ---
	@Column(name = "address_street")
	private String addressStreet;

	// ... (todos os outros campos de endereço, contacto e redes sociais continuam
	// aqui)
	@Column(name = "address_number")
	private String addressNumber;

	@Column(name = "address_neighborhood")
	private String addressNeighborhood;

	@Column(name = "address_city")
	private String addressCity;

	@Column(name = "address_state")
	private String addressState;

	@Column(name = "address_zip_code")
	private String addressZipCode;

	@Column(name = "phone_primary")
	private String phonePrimary;

	@Column(name = "phone_whatsapp")
	private String phoneWhatsapp;

	@Column(name = "email_contact")
	private String emailContact;

	@Column(name = "social_instagram_url")
	private String socialInstagramUrl;

	@Column(name = "social_facebook_url")
	private String socialFacebookUrl;

	@Column(name = "social_youtube_url")
	private String socialYoutubeUrl;

	@Column(name = "social_x_url")
	private String socialXUrl;

	@Column(name = "off_air_title")
	private String offAirTitle;

	@Column(name = "off_air_subtitle")
	private String offAirSubtitle;

	@Column(name = "off_air_image_url", length = 1024)
	private String offAirImageUrl;

	public RadioInfo() {
	}

	// Getters e Setters para os novos campos
	public String getRadioName() {
		return radioName;
	}

	public void setRadioName(String radioName) {
		this.radioName = radioName;
	}

	public String getSlogan() {
		return slogan;
	}

	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	// Getters e Setters existentes...
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddressStreet() {
		return addressStreet;
	}

	public void setAddressStreet(String addressStreet) {
		this.addressStreet = addressStreet;
	}

	public String getAddressNumber() {
		return addressNumber;
	}

	public void setAddressNumber(String addressNumber) {
		this.addressNumber = addressNumber;
	}

	public String getAddressNeighborhood() {
		return addressNeighborhood;
	}

	public void setAddressNeighborhood(String addressNeighborhood) {
		this.addressNeighborhood = addressNeighborhood;
	}

	public String getAddressCity() {
		return addressCity;
	}

	public void setAddressCity(String addressCity) {
		this.addressCity = addressCity;
	}

	public String getAddressState() {
		return addressState;
	}

	public void setAddressState(String addressState) {
		this.addressState = addressState;
	}

	public String getAddressZipCode() {
		return addressZipCode;
	}

	public void setAddressZipCode(String addressZipCode) {
		this.addressZipCode = addressZipCode;
	}

	public String getPhonePrimary() {
		return phonePrimary;
	}

	public void setPhonePrimary(String phonePrimary) {
		this.phonePrimary = phonePrimary;
	}

	public String getPhoneWhatsapp() {
		return phoneWhatsapp;
	}

	public void setPhoneWhatsapp(String phoneWhatsapp) {
		this.phoneWhatsapp = phoneWhatsapp;
	}

	public String getEmailContact() {
		return emailContact;
	}

	public void setEmailContact(String emailContact) {
		this.emailContact = emailContact;
	}

	public String getSocialInstagramUrl() {
		return socialInstagramUrl;
	}

	public void setSocialInstagramUrl(String socialInstagramUrl) {
		this.socialInstagramUrl = socialInstagramUrl;
	}

	public String getSocialFacebookUrl() {
		return socialFacebookUrl;
	}

	public void setSocialFacebookUrl(String socialFacebookUrl) {
		this.socialFacebookUrl = socialFacebookUrl;
	}

	public String getSocialYoutubeUrl() {
		return socialYoutubeUrl;
	}

	public void setSocialYoutubeUrl(String socialYoutubeUrl) {
		this.socialYoutubeUrl = socialYoutubeUrl;
	}

	public String getSocialXUrl() {
		return socialXUrl;
	}

	public void setSocialXUrl(String socialXUrl) {
		this.socialXUrl = socialXUrl;
	}

	public String getOffAirTitle() {
		return offAirTitle;
	}

	public void setOffAirTitle(String offAirTitle) {
		this.offAirTitle = offAirTitle;
	}

	public String getOffAirSubtitle() {
		return offAirSubtitle;
	}

	public void setOffAirSubtitle(String offAirSubtitle) {
		this.offAirSubtitle = offAirSubtitle;
	}

	public String getOffAirImageUrl() {
		return offAirImageUrl;
	}

	public void setOffAirImageUrl(String offAirImageUrl) {
		this.offAirImageUrl = offAirImageUrl;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		RadioInfo radioInfo = (RadioInfo) o;
		return Objects.equals(id, radioInfo.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
