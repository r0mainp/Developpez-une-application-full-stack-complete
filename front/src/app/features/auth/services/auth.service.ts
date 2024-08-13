import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs';
import { AuthSuccess } from '../interfaces/auth-success';
import { RegisterRequest } from '../interfaces/register-request';
import { User } from 'src/app/core/interfaces/user';

/**
 * Service for handling authentication-related operations.
 * 
 * This service provides methods for user login, registration, and fetching the current user's information.
 * It interacts with the authentication API endpoints to perform these operations.
 * 
 * @example
 * ```typescript
 * authService.login({ email: 'user@example.com', password: 'password' })
 *   .subscribe(authSuccess => {
 *     console.log('Login successful:', authSuccess);
 *   });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** The base path for authentication-related API endpoints. */
  private pathService = 'api/auth';

  /**
   * Creates an instance of AuthService.
   * 
   * @param {HttpClient} httpClient - The HttpClient instance for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Logs in a user with the provided credentials.
   * 
   * Sends a login request to the server with the user's email and password. Returns an observable containing
   * the authentication success response, which includes a token if the login is successful.
   * 
   * @param {LoginRequest} loginRequest - The login request payload containing email and password.
   * @returns {Observable<AuthSuccess>} An observable emitting the authentication success response.
   */
  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest);
  }

  /**
   * Retrieves the current user's information.
   * 
   * Sends a request to the server to fetch the details of the currently authenticated user. Returns an observable
   * containing the user information.
   * 
   * @returns {Observable<User>} An observable emitting the user information.
   */
  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/me`);
  }

  /**
   * Registers a new user with the provided details.
   * 
   * Sends a registration request to the server with the user's email, password, and username. Returns an observable
   * containing the authentication success response, which includes a token if the registration is successful.
   * 
   * @param {RegisterRequest} registerRequest - The registration request payload containing email, password, and username.
   * @returns {Observable<AuthSuccess>} An observable emitting the authentication success response.
   */
  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/register`, registerRequest);
  }
}
