package com.example.crmapi.controllers;
import org.springframework.web.bind.annotation.*;

import com.example.crmapi.controllers.ProspectController;
import com.example.crmapi.models.Prospect;
import com.example.crmapi.repositories.ProspectRepository;

import java.util.List;
//API pour gerer les prospects
@RestController
@RequestMapping("/api/prospects")
public class ProspectController{
    private final ProspectRepository repository;

    public ProspectController(ProspectRepository repository){
        this.repository=repository;
    }

    @GetMapping
    public List<Prospect> getAllProspects(){
        return repository.findAll();
    }

    @PostMapping
    public Prospect createProspect(@RequestBody Prospect prospect){
        return repository.save(prospect);
    }

    @PutMapping("/{id}")
    public Prospect updateProspect(@PathVariable long id, @RequestBody Prospect updatedProspect){
        return repository.findById(id).map(prospect->{
            prospect.setType(updatedProspect.getType());
            prospect.setOrigine_du_lead(updatedProspect.getOrigine_du_lead());
            prospect.setMois(updatedProspect.getMois());
            prospect.setAnnee_du_contact(updatedProspect.getAnnee_du_contact());
            prospect.setNom(updatedProspect.getNom());
            prospect.setPrenom(updatedProspect.getPrenom());
            prospect.setEmail(updatedProspect.getEmail());
            prospect.setTel(updatedProspect.getTel());
            prospect.setNiveau_actuel(updatedProspect.getNiveau_actuel());
            prospect.setDiplome_prepare(updatedProspect.getDiplome_prepare());
            prospect.setSpecialite(updatedProspect.getSpecialite());
            prospect.setEtablissement(updatedProspect.getEtablissement());
            prospect.setCode_postale(updatedProspect.getCode_postale());
            prospect.setVille(updatedProspect.getVille());
            prospect.setAnnee_de_recrutement(updatedProspect.getAnnee_de_recrutement());
            return repository.save(prospect);
        }).orElseThrow(()->new RuntimeException("Prospect non trouve"));
    }

    @DeleteMapping("/{id}")
    public void deleteProspect(@PathVariable Long id){
        repository.deleteById(id);
    }
} 