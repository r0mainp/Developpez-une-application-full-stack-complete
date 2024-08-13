/**
 * Represents a request to update or retrieve user information.
 * 
 * @remarks
 * This interface defines the structure of a request used to handle user-related operations,
 * such as updating user details or retrieving specific user information. It includes
 * properties for the user's email, username, and a unique identifier.
 * 
 * @interface
 */
export interface UserRequest {
    
    /**
     * The email address of the user.
     * 
     * @remarks
     * This property holds the user's email address. It is a string value and should be
     * a valid email format.
     * 
     * @example
     * "user@example.com"
     */
    email: string;

    /**
     * The username of the user.
     * 
     * @remarks
     * This property holds the user's username. It is a string value that is unique to
     * the user within the application.
     * 
     * @example
     * "john_doe"
     */
    username: string;

    /**
     * The unique identifier of the user.
     * 
     * @remarks
     * This property is a numeric value that uniquely identifies the user within the
     * system. It is used to reference a specific user record.
     * 
     * @example
     * 1
     */
    id: number;
}
