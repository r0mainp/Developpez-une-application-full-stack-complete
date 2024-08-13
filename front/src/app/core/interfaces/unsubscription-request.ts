/**
 * Represents a request to unsubscribe a user from a theme.
 * 
 * @remarks
 * This interface defines the structure of a request used to process an unsubscription
 * action. It includes the unique identifier of the subscription that is to be removed.
 * 
 * @interface
 */
export interface UnsubscriptionRequest {

    /**
     * The unique identifier of the subscription to be removed.
     * 
     * @remarks
     * This property is a numeric value that identifies the subscription record which
     * should be unsubscribed. It corresponds to the `id` of the subscription that needs
     * to be cancelled.
     * 
     * @example
     * 123
     */
    id: number;
}
