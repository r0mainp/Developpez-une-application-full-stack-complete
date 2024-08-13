import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { ArticleRequest } from '../interfaces/article-request';

/**
 * Service for managing articles in the application.
 * 
 * The `ArticleService` class provides methods to interact with the article-related endpoints of the
 * backend API. It allows for fetching a list of articles, retrieving details of a specific article,
 * and creating new articles.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  /** The base path for the article API endpoints. */
  private pathService = 'api/article';

  /**
   * Constructs an instance of the `ArticleService`.
   * 
   * @param httpClient - The HTTP client used to make HTTP requests to the backend API.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Fetches a list of articles with optional sorting.
   * 
   * @param sortOrder - The order in which articles should be sorted. Defaults to 'desc'.
   * @returns An observable of an array of `Article` objects.
   */
  public all(sortOrder: string = 'desc'): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}?sort=${sortOrder}`);
  }

  /**
   * Retrieves a specific article by its unique identifier.
   * 
   * @param id - The unique identifier of the article to retrieve.
   * @returns An observable of the `Article` object.
   */
  public findById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.pathService}/${id}`);
  }

  /**
   * Creates a new article with the specified request data.
   * 
   * @param request - The data needed to create the article.
   * @returns An observable of the newly created `Article` object.
   */
  public create(request: ArticleRequest): Observable<Article> {
    return this.httpClient.post<Article>(`${this.pathService}/create`, request);
  }
}
