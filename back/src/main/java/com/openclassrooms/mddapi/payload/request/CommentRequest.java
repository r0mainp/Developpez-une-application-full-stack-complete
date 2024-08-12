package com.openclassrooms.mddapi.payload.request;

import jakarta.validation.constraints.NotBlank;

public class CommentRequest {
    @NotBlank
    String content;

    @NotBlank
    Integer article_id;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getArticle_id() {
        return article_id;
    }

    public void setArticle_id(Integer article_id) {
        this.article_id = article_id;
    }

    
}
