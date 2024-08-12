import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Subscription } from '../interfaces/subscription';
import { GenericResponse } from '../interfaces/generic-response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private pathService: string = "api/subscription";
  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>(`${this.pathService}`);
  }

  public subscribe(articleId: number): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.pathService}/subscribe`, articleId);
  }

  public unSubscribe(articleId: number): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.pathService}/unsubscribe`, articleId);
  }
}
