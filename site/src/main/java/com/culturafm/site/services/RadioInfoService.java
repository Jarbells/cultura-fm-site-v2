// src/main/java/com/culturafm/site/services/RadioInfoService.java
package com.culturafm.site.services;

import com.culturafm.site.dto.RadioInfoDTO;
import com.culturafm.site.entities.RadioInfo;
import com.culturafm.site.repository.RadioInfoRepository;
import com.culturafm.site.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RadioInfoService {

	@Autowired
	private RadioInfoRepository repository;

	private final Long fixedId = 1L;

	@Transactional
	public RadioInfoDTO getInfo() {
		Optional<RadioInfo> obj = repository.findById(fixedId);
		RadioInfo entity = obj.orElseGet(() -> {
			RadioInfo newInfo = new RadioInfo();
			newInfo.setId(fixedId);
			newInfo.setRadioName("Nome da Rádio");
			// --- VALORES PADRÃO ADICIONADOS ---
			newInfo.setOffAirTitle("Retransmissão Via Satélite");
			newInfo.setOffAirSubtitle("A melhor programação para você");
		    newInfo.setOffAirImageUrl("https://images.unsplash.com/photo-1598387993441-a364f55142b4?q=80&w=1920&auto=format&fit=crop");
			return repository.save(newInfo);
		});
		return new RadioInfoDTO(entity);
	}

	@Transactional
	public RadioInfoDTO updateInfo(RadioInfoDTO dto) {
		try {
			RadioInfo entity = repository.findById(fixedId).orElseThrow(() -> new EntityNotFoundException());

			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new RadioInfoDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(
					"Não foi possível atualizar. Informações da rádio com ID " + fixedId + " não encontradas.");
		}
	}

	private void copyDtoToEntity(RadioInfoDTO dto, RadioInfo entity) {
		entity.setRadioName(dto.getRadioName());
		entity.setSlogan(dto.getSlogan());
		entity.setLogoUrl(dto.getLogoUrl());
		entity.setAddressStreet(dto.getAddressStreet());
		entity.setAddressNumber(dto.getAddressNumber());
		entity.setAddressNeighborhood(dto.getAddressNeighborhood());
		entity.setAddressCity(dto.getAddressCity());
		entity.setAddressState(dto.getAddressState());
		entity.setAddressZipCode(dto.getAddressZipCode());
		entity.setPhonePrimary(dto.getPhonePrimary());
		entity.setPhoneWhatsapp(dto.getPhoneWhatsapp());
		entity.setEmailContact(dto.getEmailContact());
		entity.setSocialInstagramUrl(dto.getSocialInstagramUrl());
		entity.setSocialFacebookUrl(dto.getSocialFacebookUrl());
		entity.setSocialYoutubeUrl(dto.getSocialYoutubeUrl());
		entity.setSocialXUrl(dto.getSocialXUrl());
		entity.setOffAirTitle(dto.getOffAirTitle());
		entity.setOffAirSubtitle(dto.getOffAirSubtitle());
	    entity.setOffAirImageUrl(dto.getOffAirImageUrl());
	}
}