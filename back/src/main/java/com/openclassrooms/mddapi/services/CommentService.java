package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

/**
 * Service class for managing {@link Comment} entities.
 * Provides methods to add comments and retrieve comments associated with a specific article.
 */
@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    /**
     * Adds a new comment to the repository.
     * 
     * @param comment The {@link Comment} entity to be added.
     * @return The saved {@link Comment} entity.
     */
    public Comment addComment(Comment comment) {
        return this.commentRepository.save(comment);
    }

    /**
     * Retrieves all comments associated with a specific article, sorted according to the provided {@link Sort} object.
     * 
     * @param articleId The ID of the article whose comments are to be retrieved.
     * @param sort The {@link Sort} object specifying the sorting order of the comments.
     * @return A list of {@link CommentDto} objects representing the comments associated with the specified article.
     */
    public List<CommentDto> getCommentsByArticleId(Integer articleId, Sort sort) {
        // Retrieve comments for the specified article and sort them
        List<Comment> comments = commentRepository.findByArticleId(articleId, sort);
        // Convert the comments to DTOs
        return comments.stream()
                       .map(this::convertToDTO)
                       .collect(Collectors.toList());
    }

    /**
     * Converts a {@link Comment} entity to a {@link CommentDto} data transfer object.
     * 
     * @param comment The {@link Comment} entity to be converted.
     * @return The corresponding {@link CommentDto} data transfer object.
     */
    private CommentDto convertToDTO(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setAuthor(comment.getAuthor().getDisplayUsername());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
