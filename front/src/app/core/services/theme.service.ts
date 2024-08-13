import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../../features/articles/interfaces/theme';
import { Observable } from 'rxjs';

/**
 * Service for managing theme-related operations.
 * 
 * @remarks
 * This service provides methods for retrieving theme data from the backend API.
 * It includes functionalities for fetching all themes and finding a theme by its ID.
 * The service uses Angular's `HttpClient` to perform HTTP requests and handle
 * responses.
 * 
 * @example
 * const themeService = new ThemeService(httpClient);
 * themeService.all().subscribe(themes => console.log(themes));
 * 
 * @see {@link Theme}
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * The base path for the theme API endpoints.
   * 
   * @remarks
   * This path is used as the base URL for all theme-related HTTP requests.
   * It is combined with endpoint paths to form the complete URL for API calls.
   * 
   * @default "api/theme"
   */
  private pathService = 'api/theme';

  /**
   * Constructs the `ThemeService` with the provided `HttpClient`.
   * 
   * @param httpClient - The Angular `HttpClient` used to make HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves all themes.
   * 
   * @returns An `Observable` that emits an array of `Theme` objects.
   * 
   * @example
   * themeService.all().subscribe(themes => console.log(themes));
   */
  public all(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(this.pathService);
  }

  /**
   * Finds a theme by its ID.
   * 
   * @param id - The ID of the theme to retrieve.
   * @returns An `Observable` that emits the `Theme` object with the specified ID.
   * 
   * @example
   * themeService.findById('1').subscribe(theme => console.log(theme));
   */
  public findById(id: string): Observable<Theme> {
    return this.httpClient.get<Theme>(`${this.pathService}/${id}`);
  }
}
