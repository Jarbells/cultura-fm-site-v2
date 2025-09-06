package com.culturafm.site.repository;

import com.culturafm.site.entities.RadioInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RadioInfoRepository extends JpaRepository<RadioInfo, Long> {
	
}