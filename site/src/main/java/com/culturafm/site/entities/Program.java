package com.culturafm.site.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_program")
public class Program {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(name = "days_of_week")
	private String daysOfWeek;

	@Column(name = "start_time")
	private LocalTime startTime;

	@Column(name = "end_time")
	private LocalTime endTime;

	@Column(name = "additional_info")
	private String additionalInfo;

	@OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProgramImage> images = new HashSet<>();

	// --- CORREÇÃO PRINCIPAL APLICADA AQUI ---
	// Trocamos 'Set' por 'List' para manter a ordem de inserção.
	// Adicionamos '@OrderColumn' para que o JPA crie uma coluna
	// que armazena a posição de cada locutor na lista.
	@ManyToMany
	@JoinTable(name = "tb_program_locutor",
			   joinColumns = @JoinColumn(name = "program_id"),
			   inverseJoinColumns = @JoinColumn(name = "locutor_id"))
	@OrderColumn(name = "announcer_order")
	private List<Locutor> announcers = new ArrayList<>();

	public Program() {
	}

	public Program(Long id, String name, String daysOfWeek, LocalTime startTime, LocalTime endTime, String additionalInfo) {
		this.id = id;
		this.name = name;
		this.daysOfWeek = daysOfWeek;
		this.startTime = startTime;
		this.endTime = endTime;
		this.additionalInfo = additionalInfo;
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

	public String getDaysOfWeek() {
		return daysOfWeek;
	}

	public void setDaysOfWeek(String daysOfWeek) {
		this.daysOfWeek = daysOfWeek;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public String getAdditionalInfo() {
		return additionalInfo;
	}

	public void setAdditionalInfo(String additionalInfo) {
		this.additionalInfo = additionalInfo;
	}

	public Set<ProgramImage> getImages() {
		return images;
	}

	public void setImages(Set<ProgramImage> images) {
		this.images = images;
	}

	// Getter e Setter atualizados para usar 'List'
	public List<Locutor> getAnnouncers() {
		return announcers;
	}

	public void setAnnouncers(List<Locutor> announcers) {
		this.announcers = announcers;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Program other = (Program) obj;
		return Objects.equals(id, other.id);
	}
}