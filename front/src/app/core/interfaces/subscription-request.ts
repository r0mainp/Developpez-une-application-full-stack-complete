/**
 * Represents a request to subscribe to a theme.
 * 
 * @remarks
 * This interface defines the structure of the request payload needed to subscribe
 * a user to a specific theme. It is typically used when sending a request to an API
 * endpoint to create a new subscription.
 * 
 * @interface
 */
export interface SubscriptionRequest {

    /**
     * The unique identifier of the theme to which the user wants to subscribe.
     * 
     * @remarks
     * This property holds the `theme_id` which represents the specific theme that
     * the user is requesting to subscribe to. It is a numeric value and is required
     * to process the subscription request.
     * 
     * @example
     * ```json
     * {
     *   "theme_id": 123
     * }
     * ```
     */
    theme_id: number;
}
