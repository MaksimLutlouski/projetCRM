package com.example.crmapi.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="comments")
@Data
//Tableau/modele pour les commentaires
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idProspect;
    private String commentaire;
}
