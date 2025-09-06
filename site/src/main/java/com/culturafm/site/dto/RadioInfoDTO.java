package com.culturafm.site.dto;

import org.springframework.beans.BeanUtils;

import com.culturafm.site.entities.RadioInfo;

public class RadioInfoDTO {

	private Long id;
	private String addressStreet;
	private String addressNumber;
	private String addressNeighborhood;
	private String addressCity;
	private String addressState;
	private String addressZipCode;
	private String phonePrimary;
	private String phoneWhatsapp;
	private String emailContact;
	private String socialInstagramUrl;
	private String socialFacebookUrl;
	private String socialYoutubeUrl;
	private String socialXUrl;
	private String radioName;
	private String slogan;
	private String logoUrl;
	private String offAirTitle;
	private String offAirSubtitle;
	private String offAirImageUrl;

	public RadioInfoDTO() {
	}

	public RadioInfoDTO(RadioInfo entity) {
		BeanUtils.copyProperties(entity, this);
	}

	// Getters e Setters
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
}