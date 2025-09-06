// src/main/java/com/culturafm/site/repository/LocutorRepository.java

package com.culturafm.site.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.culturafm.site.entities.Locutor;

@Repository
public interface LocutorRepository extends JpaRepository<Locutor, Long> {

}