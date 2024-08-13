/**
 * Represents a user within the application.
 * 
 * @remarks
 * This interface defines the structure of a user object, which includes properties
 * such as the unique identifier, username, email, and timestamps for creation and 
 * last update. This interface is used to represent user data in various parts of the
 * application.
 * 
 * @interface
 */
export interface User {
    
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

    /**
     * The username of the user.
     * 
     * @remarks
     * This property holds the username chosen by the user. It is a string value
     * that is unique within the application and is used for user identification.
     * 
     * @example
     * "john_doe"
     */
    username: string;

    /**
     * The email address of the user.
     * 
     * @remarks
     * This property contains the user's email address. It is a string value and 
     * should be a valid email format. This property is used for user communication 
     * and identification.
     * 
     * @example
     * "user@example.com"
     */
    email: string;

    /**
     * The date and time when the user was created.
     * 
     * @remarks
     * This property records the timestamp when the user account was created. It is a
     * `Date` object representing the creation time.
     * 
     * @example
     * new Date('2024-08-13T12:00:00Z')
     */
    created_at: Date;

    /**
     * The date and time when the user was last updated.
     * 
     * @remarks
     * This property records the timestamp when the user account was last updated. It is
     * a `Date` object representing the last update time.
     * 
     * @example
     * new Date('2024-08-13T12:00:00Z')
     */
    updated_at: Date;
}
