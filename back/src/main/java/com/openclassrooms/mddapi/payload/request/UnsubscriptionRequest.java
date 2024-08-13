package com.openclassrooms.mddapi.payload.request;

/**
 * Represents a request payload for unsubscribing from a subscription.
 * This class contains the necessary information to remove a subscription.
 */
public class UnsubscriptionRequest {

    /**
     * The ID of the subscription to be removed.
     */
    private Integer id;

    /**
     * Gets the ID of the subscription to be removed.
     * 
     * @return the subscription ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the ID of the subscription to be removed.
     * 
     * @param id the subscription ID
     */
    public void setId(Integer id) {
        this.id = id;
    }
}
