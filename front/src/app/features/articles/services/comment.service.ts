import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private pathService = 'api/comment'

  constructor(private httpClient: HttpClient) { }

  public all(articleId: number, sortOrder: string = 'desc'): Observable<Comment[]> {
    console.log(articleId)
    return this.httpClient.get<Comment[]>(`${this.pathService}?articleId=${articleId}&sort=${sortOrder}`);
  }
}
