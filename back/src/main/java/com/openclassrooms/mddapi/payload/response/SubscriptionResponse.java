package com.openclassrooms.mddapi.payload.response;

import java.time.LocalDateTime;

/**
 * Represents a response payload for subscription details.
 * This class encapsulates information about a subscription, including
 * identifiers for the subscription, the theme, and the user, as well as
 * the creation timestamp of the subscription.
 */
public class SubscriptionResponse {

    /**
     * The unique identifier of the subscription.
     */
    private Integer id;

    /**
     * The unique identifier of the theme associated with the subscription.
     */
    private Integer theme_id;

    /**
     * The unique identifier of the user who created the subscription.
     */
    private Integer user_id;

    /**
     * The timestamp when the subscription was created.
     */
    private LocalDateTime createdAt;

    /**
     * Gets the unique identifier of the subscription.
     * 
     * @return the unique identifier of the subscription
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the subscription.
     * 
     * @param id the unique identifier to set for the subscription
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets the unique identifier of the theme associated with the subscription.
     * 
     * @return the unique identifier of the theme
     */
    public Integer getTheme_id() {
        return theme_id;
    }

    /**
     * Sets the unique identifier of the theme associated with the subscription.
     * 
     * @param theme_id the unique identifier to set for the theme
     */
    public void setTheme_id(Integer theme_id) {
        this.theme_id = theme_id;
    }

    /**
     * Gets the unique identifier of the user who created the subscription.
     * 
     * @return the unique identifier of the user
     */
    public Integer getUser_id() {
        return user_id;
    }

    /**
     * Sets the unique identifier of the user who created the subscription.
     * 
     * @param user_id the unique identifier to set for the user
     */
    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    /**
     * Gets the timestamp when the subscription was created.
     * 
     * @return the creation timestamp of the subscription
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Sets the timestamp when the subscription was created.
     * 
     * @param createdAt the creation timestamp to set for the subscription
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
