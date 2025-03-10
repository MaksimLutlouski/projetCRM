package com.example.crmapi.repositories;

import com.example.crmapi.models.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//Une interface de référentiel qui interagit avec la base de données pour travailler avec des commentaires
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
    List<Comment> findByIdProspect(Long idProspect);
}
