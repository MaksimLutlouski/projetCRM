package com.example.crmapi.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.crmapi.models.Comment;
import com.example.crmapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
//API pour gerer les commentaires
@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins="http://localhost:5173")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @GetMapping("/{idProspect}")
    public List<Comment> getComments(@PathVariable Long idProspect){
        return commentService.getCommentsByProspect(idProspect);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment){
        return commentService.addComment(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
    }
}
