import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private pathService = 'api/comment'

  constructor(private httpClient: HttpClient) { }

  public all(articleId: number, sortOrder: string = 'desc'): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.pathService}?articleId=${articleId}&sort=${sortOrder}`);
  }
}
