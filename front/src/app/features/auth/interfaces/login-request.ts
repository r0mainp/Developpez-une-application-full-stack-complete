/**
 * Represents the request payload for user login.
 * 
 * This interface defines the structure of the data sent to the server when a user attempts to log in.
 * It includes the user's email and password required for authentication.
 * 
 * @interface
 */
export interface LoginRequest {
    /**
     * The email address of the user attempting to log in.
     * 
     * This field should contain a valid email format and is used to identify the user.
     * 
     * @type {string}
     */
    email: string;

    /**
     * The password of the user attempting to log in.
     * 
     * This field should be a non-empty string and is used in conjunction with the email to authenticate the user.
     * 
     * @type {string}
     */
    password: string;
}
