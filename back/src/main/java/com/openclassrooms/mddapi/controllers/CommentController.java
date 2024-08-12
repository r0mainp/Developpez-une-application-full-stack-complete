package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.services.CommentService;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping()
    public ResponseEntity<List<Comment>> findAllCommentByArticle(
        @RequestParam Integer articleId,
        @RequestParam(defaultValue = "asc") String sort
    ){
        Sort sortOrder = Sort.by(Sort.Order.by("createdAt").with(Sort.Direction.fromString(sort)));
        List<Comment> comments = this.commentService.getCommentsByArticleId(articleId, sortOrder);

        return ResponseEntity.ok().body(comments);
    }
}
