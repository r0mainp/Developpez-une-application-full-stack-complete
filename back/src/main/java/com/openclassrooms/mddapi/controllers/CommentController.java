package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.UserService;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

    @Autowired
    ArticleService articleService;

    @GetMapping()
    public ResponseEntity<List<CommentDto>> findAllCommentByArticle(
            @RequestParam Integer articleId,
            @RequestParam(defaultValue = "asc") String sort
    ) {
        Sort sortOrder = Sort.by(Sort.Order.by("createdAt").with(Sort.Direction.fromString(sort)));
        List<CommentDto> comments = commentService.getCommentsByArticleId(articleId, sortOrder);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/add")
    public Comment addComment(@RequestBody  CommentRequest request){
        User currentUser = this.userService.getCurrentUser();
        Article relatedArticle = this.articleService.findById(request.getArticle_id());

        Comment commenToAdd = new Comment()
            .setAuthor(currentUser)
            .setArticle(relatedArticle)
            .setContent(request.getContent());

        return this.commentService.addComment(commenToAdd);

    }
}
