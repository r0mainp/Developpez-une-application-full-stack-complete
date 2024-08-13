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

/**
 * Controller for managing comments on articles.
 * Provides endpoints for retrieving comments on an article and adding new comments.
 */
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;

    /**
     * Retrieves all comments for a specific article.
     * 
     * @param articleId The ID of the article for which comments are to be retrieved.
     * @param sort Optional parameter to specify the sorting order of the comments.
     *             Defaults to "asc" (ascending) if not provided.
     * @return ResponseEntity containing a list of {@link CommentDto} objects representing the comments for the specified article.
     */
    @GetMapping
    public ResponseEntity<List<CommentDto>> findAllCommentByArticle(
            @RequestParam Integer articleId,
            @RequestParam(defaultValue = "asc") String sort
    ) {
        Sort sortOrder = Sort.by(Sort.Order.by("createdAt").with(Sort.Direction.fromString(sort)));
        List<CommentDto> comments = commentService.getCommentsByArticleId(articleId, sortOrder);
        return ResponseEntity.ok(comments);
    }

    /**
     * Adds a new comment to a specific article.
     * 
     * @param request The {@link CommentRequest} object containing the details of the comment to be added.
     * @return The created {@link Comment} object.
     */
    @PostMapping("/add")
    public Comment addComment(@RequestBody CommentRequest request) {
        User currentUser = this.userService.getCurrentUser();
        Article relatedArticle = this.articleService.findById(request.getArticle_id());

        Comment commentToAdd = new Comment()
            .setAuthor(currentUser)
            .setArticle(relatedArticle)
            .setContent(request.getContent());

        return this.commentService.addComment(commentToAdd);
    }
}
