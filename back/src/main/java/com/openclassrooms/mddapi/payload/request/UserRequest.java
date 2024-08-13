package com.openclassrooms.mddapi.payload.request;

/**
 * Represents a request payload for updating user information.
 * This class is used to encapsulate the details required to update a user's profile.
 */
public class UserRequest {

    /**
     * The username of the user.
     */
    private String username;

    /**
     * The email address of the user.
     */
    private String email;

    /**
     * The unique ID of the user to be updated.
     */
    private Integer id;

    /**
     * Gets the username of the user.
     * 
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     * 
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the email address of the user.
     * 
     * @return the email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address of the user.
     * 
     * @param email the email address to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the unique ID of the user to be updated.
     * 
     * @return the user ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the unique ID of the user to be updated.
     * 
     * @param id the user ID to set
     */
    public void setId(Integer id) {
        this.id = id;
    }
}
