import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { ArticleRequest } from '../interfaces/article-request';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private pathService = 'api/article';

  constructor(private httpClient: HttpClient) { }

  public all(sortOrder: string = 'desc'): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}?sort=${sortOrder}`);
  }

  public findById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.pathService}/${id}`);
  }

  public create(request: ArticleRequest): Observable<Article>{
    return this.httpClient.post<Article>(`${this.pathService}/create`, request);
  }
}
