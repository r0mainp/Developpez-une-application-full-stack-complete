package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
    List<Comment> findByArticleId(Integer articleId);
}
