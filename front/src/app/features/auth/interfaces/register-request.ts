/**
 * Represents the request payload for user registration.
 * 
 * This interface defines the structure of the data sent to the server when a new user registers an account.
 * It includes the user's email, password, and username.
 * 
 * @interface
 */
export interface RegisterRequest {
    /**
     * The email address of the user registering an account.
     * 
     * This field should contain a valid email format and is used to uniquely identify the user within the system.
     * 
     * @type {string}
     */
    email: string;

    /**
     * The password chosen by the user for their account.
     * 
     * This field should be a non-empty string and must meet the system's password complexity requirements.
     * 
     * @type {string}
     */
    password: string;

    /**
     * The username chosen by the user for their account.
     * 
     * This field should be a non-empty string and is used to identify the user within the system.
     * 
     * @type {string}
     */
    username: string;
}
