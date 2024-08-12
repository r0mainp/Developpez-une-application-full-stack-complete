package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment addComment(Comment comment){
        return this.commentRepository.save(comment);
    }

    public List<CommentDto> getCommentsByArticleId(Integer articleId, Sort sort) {
        List<Comment> comments = commentRepository.findByArticleId(articleId, sort);
        return comments.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
    }

    private CommentDto convertToDTO(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setAuthor(comment.getAuthor().getDisplayUsername());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
