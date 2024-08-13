package com.openclassrooms.mddapi.payload.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Represents a request payload for creating or updating an article.
 * This class encapsulates the data needed to create or modify an article.
 */
public class ArticleRequest {

    /**
     * The title of the article.
     * This field cannot be blank.
     */
    @NotBlank
    private String title;

    /**
     * The content of the article.
     * This field cannot be blank.
     */
    @NotBlank
    private String content;

    /**
     * The identifier of the theme associated with the article.
     * This field cannot be blank.
     */
    @NotBlank
    private Integer theme_id;

    /**
     * Gets the title of the article.
     * 
     * @return the title of the article
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title of the article.
     * 
     * @param title the title of the article
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the content of the article.
     * 
     * @return the content of the article
     */
    public String getContent() {
        return content;
    }

    /**
     * Sets the content of the article.
     * 
     * @param content the content of the article
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Gets the identifier of the theme associated with the article.
     * 
     * @return the theme identifier
     */
    public Integer getTheme_id() {
        return theme_id;
    }

    /**
     * Sets the identifier of the theme associated with the article.
     * 
     * @param theme_id the theme identifier
     */
    public void setTheme_id(Integer theme_id) {
        this.theme_id = theme_id;
    }
}
