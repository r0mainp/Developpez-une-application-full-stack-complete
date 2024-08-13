import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Subscription } from '../interfaces/subscription';
import { GenericResponse } from '../interfaces/generic-response';
import { SubscriptionRequest } from '../interfaces/subscription-request';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private pathService: string = "api/subscription";
  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>(`${this.pathService}`);
  }

  public subscribe(request:SubscriptionRequest): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.pathService}/subscribe`, request);
  }

  public unSubscribe(request:SubscriptionRequest): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.pathService}/unsubscribe`, request);
  }
}
