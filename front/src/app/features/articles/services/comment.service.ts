import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { CommentRequest } from '../interfaces/comment-request';

/**
 * Service for managing comments in the application.
 * 
 * The `CommentService` class provides methods to interact with the comment-related endpoints of the
 * backend API. It allows for fetching comments for a specific article and creating new comments.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  /** The base path for the comment API endpoints. */
  private pathService = 'api/comment';

  /**
   * Constructs an instance of the `CommentService`.
   * 
   * @param httpClient - The HTTP client used to make HTTP requests to the backend API.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Fetches a list of comments for a specific article with optional sorting.
   * 
   * @param articleId - The unique identifier of the article whose comments are to be retrieved.
   * @param sortOrder - The order in which comments should be sorted. Defaults to 'desc'.
   * @returns An observable of an array of `Comment` objects.
   */
  public all(articleId: number, sortOrder: string = 'desc'): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.pathService}?articleId=${articleId}&sort=${sortOrder}`);
  }

  /**
   * Creates a new comment with the specified request data.
   * 
   * @param request - The data needed to create the comment.
   * @returns An observable of the newly created `Comment` object.
   */
  public create(request: CommentRequest): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.pathService}/add`, request);
  }
}
