/**
 * Represents a subscription entity linking a user to a theme.
 * 
 * @remarks
 * This interface defines the structure of a subscription, which includes the 
 * unique identifiers for both the user and the theme involved in the subscription.
 * It is used to represent the relationship between a user and a theme in the system.
 * 
 * @interface
 */
export interface Subscription {

    /**
     * The unique identifier of the subscription.
     * 
     * @remarks
     * This property is a numeric value that uniquely identifies a subscription entity.
     * It is generated by the system and is used to reference a specific subscription record.
     * 
     * @example
     * 1
     */
    id: number;

    /**
     * The unique identifier of the user who holds the subscription.
     * 
     * @remarks
     * This property is a numeric value that corresponds to the user who is subscribed
     * to the theme. It references the user’s ID in the user management system.
     * 
     * @example
     * 42
     */
    user_id: number;

    /**
     * The unique identifier of the theme to which the user is subscribed.
     * 
     * @remarks
     * This property is a numeric value that corresponds to the theme that the user is
     * subscribed to. It references the theme’s ID in the theme management system.
     * 
     * @example
     * 101
     */
    theme_id: number;
}
