package com.example.crmapi.repositories;

import com.example.crmapi.models.Prospect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//Une interface de référentiel qui interagit avec la base de données pour travailler avec des prospects
@Repository
public interface ProspectRepository extends JpaRepository<Prospect, Long>{}