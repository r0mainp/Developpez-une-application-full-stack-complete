package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * Data Transfer Object (DTO) for transferring article data.
 * This DTO is used to encapsulate article data that is transferred between the client and the server.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class ArticleDto {

    /**
     * Unique identifier for the article.
     */
    private Integer id;

    /**
     * Title of the article.
     */
    private String title;

    /**
     * Content of the article.
     */
    private String content;

    /**
     * Timestamp of when the article was created.
     */
    private LocalDateTime createdAt;

    /**
     * Timestamp of when the article was last updated.
     */
    private LocalDateTime updatedAt;

    /**
     * Identifier of the theme associated with the article.
     */
    private Integer themeId;

    /**
     * Identifier of the author of the article.
     */
    private Integer authorId;
}
