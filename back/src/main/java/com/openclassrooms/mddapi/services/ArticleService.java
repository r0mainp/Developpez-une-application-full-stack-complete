package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.mapper.ArticleMapper;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.payload.response.SubscriptionResponse;
import com.openclassrooms.mddapi.repository.ArticleRepository;

/**
 * Service class for managing {@link Article} entities.
 * Provides methods to retrieve, create, and process articles based on user subscriptions.
 */
@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private SubscriptionService subscriptionService;

    /**
     * Retrieves an {@link Article} by its ID.
     * 
     * @param id The ID of the article to retrieve.
     * @return The {@link Article} if found, or {@code null} if not found.
     */
    public Article findById(Integer id) {
        return this.articleRepository.findById(id).orElse(null);
    }

    /**
     * Retrieves all articles that match the themes subscribed by the current user.
     * 
     * @param sort The {@link Sort} object specifying the sorting order of the articles.
     * @return A list of {@link ArticleDto} objects representing the articles.
     */
    public List<ArticleDto> findAllArticlesByUserSubscriptions(Sort sort) {
        // Retrieve the current user's subscriptions
        List<SubscriptionResponse> subscriptions = this.subscriptionService.getCurrentUserSubscriptions();
        // Extract theme IDs from subscriptions
        List<Integer> themeIds = subscriptions.stream()
                .map(SubscriptionResponse::getTheme_id)
                .collect(Collectors.toList());

        // Find articles based on the theme IDs and sort them
        List<Article> articles = this.articleRepository.findByThemeIdIn(themeIds, sort);
        // Convert articles to DTOs
        return articles.stream()
                       .map(articleMapper::toDto)
                       .collect(Collectors.toList());
    }

    /**
     * Creates a new {@link Article}.
     * 
     * @param article The {@link Article} to create.
     * @return The created {@link Article} entity.
     */
    public Article create(Article article) {
        return this.articleRepository.save(article);
    }
}
