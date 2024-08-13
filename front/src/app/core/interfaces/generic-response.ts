/**
 * Represents a generic response structure with a message.
 * 
 * @remarks
 * This interface is used to standardize responses that include a message. It can be
 * utilized for various purposes such as success messages, error notifications, or
 * general status updates in API responses.
 * 
 * @interface
 */
export interface GenericResponse {

    /**
     * A message included in the response.
     * 
     * @remarks
     * This property contains the textual message that provides additional context or
     * information about the response. It could represent a success message, an error
     * message, or any other type of informational message.
     * 
     * @example
     * ```json
     * {
     *   "message": "Operation completed successfully."
     * }
     * ```
     */
    message: string;
}