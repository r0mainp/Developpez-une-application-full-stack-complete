package com.openclassrooms.mddapi.payload.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Represents a request payload for creating or updating a comment.
 * This class encapsulates the data needed to create or modify a comment.
 */
public class CommentRequest {

    /**
     * The content of the comment.
     * This field cannot be blank.
     */
    @NotBlank
    private String content;

    /**
     * The identifier of the article to which the comment belongs.
     * This field cannot be blank.
     */
    @NotBlank
    private Integer article_id;

    /**
     * Gets the content of the comment.
     * 
     * @return the content of the comment
     */
    public String getContent() {
        return content;
    }

    /**
     * Sets the content of the comment.
     * 
     * @param content the content of the comment
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Gets the identifier of the article to which the comment belongs.
     * 
     * @return the article identifier
     */
    public Integer getArticle_id() {
        return article_id;
    }

    /**
     * Sets the identifier of the article to which the comment belongs.
     * 
     * @param article_id the article identifier
     */
    public void setArticle_id(Integer article_id) {
        this.article_id = article_id;
    }
}
