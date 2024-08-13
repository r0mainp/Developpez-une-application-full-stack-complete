package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.models.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
    List<Comment> findByArticleId(Integer articleId, Sort sort);
}
