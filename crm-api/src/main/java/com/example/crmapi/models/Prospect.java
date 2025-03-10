package com.example.crmapi.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="prospects")
@Data
@NoArgsConstructor
@AllArgsConstructor
//Tableau/modele pour les prospects
public class Prospect{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String origine_du_lead;
    private String mois;
    private int annee_du_contact;
    private String nom;
    private String prenom;
    private String email;
    private String tel;
    private String niveau_actuel;
    private String diplome_prepare;
    private String specialite;
    private String etablissement;
    private int code_postale;
    private String ville;
    private int annee_de_recrutement;
    private String entree_en;

}