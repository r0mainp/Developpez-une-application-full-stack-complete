package com.openclassrooms.mddapi.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    public Article findById(Integer id){
        return this.articleRepository.findById(id).orElse(null);
    }

    public List<Article> findAllArticlesByUserSubscriptions(Integer userId){
        List<Integer> themeIds = Arrays.asList(1); // TODO: for tests, implements a solution based on subscriptions later
        return this.articleRepository.findByThemeIdIn(themeIds);
    }

    public Article create(Article article){
        return this.articleRepository.save(article);
    }

}
