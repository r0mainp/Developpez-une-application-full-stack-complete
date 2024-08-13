package com.openclassrooms.mddapi.payload.request;

import jakarta.validation.constraints.NotNull;

/**
 * Represents a request payload for subscribing to a theme.
 * This class contains the necessary information to create a subscription.
 */
public class SubscriptionRequest {

    /**
     * The ID of the theme to which the user wants to subscribe.
     * This field cannot be null.
     */
    @NotNull
    private Integer theme_id;

    /**
     * Gets the ID of the theme to which the user wants to subscribe.
     * 
     * @return the theme ID
     */
    public Integer getTheme_id() {
        return theme_id;
    }

    /**
     * Sets the ID of the theme to which the user wants to subscribe.
     * 
     * @param theme_id the theme ID
     */
    public void setTheme_id(Integer theme_id) {
        this.theme_id = theme_id;
    }
}
