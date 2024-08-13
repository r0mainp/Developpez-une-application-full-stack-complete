import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserRequest } from '../interfaces/user-request';
import { GenericResponse } from '../interfaces/generic-response';

/**
 * Service for managing user-related operations with the backend API.
 * 
 * @remarks
 * This service provides methods to retrieve user details by ID and to update user
 * information. It interacts with the backend API endpoints related to user operations.
 * 
 * @example
 * const userService = new UserService(httpClient);
 * userService.getUserById('123').subscribe(user => console.log(user));
 * userService.update(userRequest).subscribe(response => console.log(response));
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * The base URL path for the user API endpoints.
   * 
   * @remarks
   * This path is used as a prefix for all user-related API requests.
   */
  private pathService = 'api/user';

  /**
   * Constructs the `UserService` with the provided `HttpClient`.
   * 
   * @param httpClient - The `HttpClient` used to make HTTP requests to the API.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves the user details for the specified user ID.
   * 
   * @param id - The unique identifier of the user to retrieve.
   * 
   * @returns An `Observable<User>` that emits the user details.
   * 
   * @example
   * userService.getUserById('123').subscribe(user => console.log(user));
   */
  public getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  /**
   * Updates the user information with the provided user request details.
   * 
   * @param userRequest - The user request object containing updated user details.
   * 
   * @returns An `Observable<GenericResponse>` that emits the response from the server.
   * 
   * @example
   * userService.update(userRequest).subscribe(response => console.log(response));
   */
  public update(userRequest: UserRequest): Observable<GenericResponse> {
    return this.httpClient.put<GenericResponse>(`${this.pathService}/`, userRequest);
  }
}
