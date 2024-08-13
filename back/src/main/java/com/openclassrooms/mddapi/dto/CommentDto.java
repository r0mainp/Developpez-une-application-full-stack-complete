package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Data Transfer Object (DTO) for transferring comment data.
 * This DTO is used to encapsulate comment data that is transferred between the client and the server.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentDto {

    /**
     * Unique identifier for the comment.
     */
    private Integer id;

    /**
     * Content of the comment.
     */
    private String content;

    /**
     * Username of the author of the comment.
     */
    private String author;

    /**
     * Timestamp of when the comment was created.
     */
    private LocalDateTime createdAt;

    /**
     * Gets the unique identifier of the comment.
     * 
     * @return the unique identifier of the comment
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the comment.
     * 
     * @param id the unique identifier of the comment
     */
    public void setId(Integer id) {
        this.id = id;
    }

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
     * Gets the username of the author of the comment.
     * 
     * @return the username of the author of the comment
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Sets the username of the author of the comment.
     * 
     * @param author the username of the author of the comment
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Gets the timestamp of when the comment was created.
     * 
     * @return the timestamp of when the comment was created
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Sets the timestamp of when the comment was created.
     * 
     * @param createdAt the timestamp of when the comment was created
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
