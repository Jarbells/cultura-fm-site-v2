package com.culturafm.site.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.culturafm.site.entities.Program;

public interface ProgramRepository extends JpaRepository<Program, Long>{
	
}
