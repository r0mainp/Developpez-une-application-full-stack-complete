/**
 * Represents a successful authentication response.
 * 
 * This interface is used to define the shape of the response object received upon successful user authentication.
 * It contains the authentication token that will be used for securing API requests.
 * 
 * @interface
 */
export interface AuthSuccess {
    /**
     * The authentication token issued upon successful login or registration.
     * 
     * This token is typically used to authenticate API requests by including it in the `Authorization` header.
     * 
     * @type {string}
     */
    token: string;
}
