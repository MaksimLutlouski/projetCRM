package com.example.crmapi.services;

import com.example.crmapi.models.Comment;
import com.example.crmapi.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//Gestion des commentaires
@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public List<Comment> getAllComments(){
        return commentRepository.findAll();

    }

    public List<Comment> getCommentsByProspect(Long idProspect){
        return commentRepository.findByIdProspect(idProspect);
    }

    public Comment addComment(Comment comment){
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id){
        commentRepository.deleteById(id);
    }
}
