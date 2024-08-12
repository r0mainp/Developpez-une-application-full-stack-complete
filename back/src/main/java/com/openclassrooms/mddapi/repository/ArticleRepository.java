package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.models.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer>{
    List<Article> findByThemeIdIn(List<Integer> themeIds, Sort sort);
}