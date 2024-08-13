import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../interfaces/subscription';
import { GenericResponse } from '../interfaces/generic-response';
import { SubscriptionRequest } from '../interfaces/subscription-request';
import { UnsubscriptionRequest } from '../interfaces/unsubscription-request';

/**
 * Service for handling subscription-related operations.
 * 
 * @remarks
 * This service provides methods for managing user subscriptions, including retrieving
 * all subscriptions, subscribing to a theme, and unsubscribing from a theme. It
 * communicates with the backend API to perform these operations and handles the
 * corresponding HTTP requests and responses.
 * 
 * @example
 * const subscriptionService = new SubscriptionService(httpClient);
 * subscriptionService.all().subscribe(subscriptions => console.log(subscriptions));
 * 
 * @see {@link Subscription}
 * @see {@link GenericResponse}
 * @see {@link SubscriptionRequest}
 * @see {@link UnsubscriptionRequest}
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  
  /**
   * The base path for the subscription API endpoints.
   * 
   * @remarks
   * This path is used as the base URL for all subscription-related HTTP requests.
   * It is combined with endpoint paths to form the complete URL for API calls.
   * 
   * @default "api/subscription"
   */
  private pathService: string = "api/subscription";

  /**
   * Constructs the `SubscriptionService` with the provided `HttpClient`.
   * 
   * @param httpClient - The Angular `HttpClient` used to make HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves all subscriptions.
   * 
   * @returns An `Observable` that emits an array of `Subscription` objects.
   * 
   * @example
   * subscriptionService.all().subscribe(subscriptions => console.log(subscriptions));
   */
  public all(): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>(`${this.pathService}/`);
  }

  /**
   * Subscribes to a theme.
   * 
   * @param request - An object containing the `SubscriptionRequest` data.
   * @returns An `Observable` that emits a `GenericResponse` indicating the result of the subscription request.
   * 
   * @example
   * const request: SubscriptionRequest = { theme_id: 1 };
   * subscriptionService.subscribe(request).subscribe(response => console.log(response));
   */
  public subscribe(request: SubscriptionRequest): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.pathService}/subscribe`, request);
  }

  /**
   * Unsubscribes from a theme.
   * 
   * @param request - An object containing the `UnsubscriptionRequest` data.
   * @returns An `Observable` that emits a `GenericResponse` indicating the result of the unsubscription request.
   * 
   * @example
   * const request: UnsubscriptionRequest = { id: 1 };
   * subscriptionService.unSubscribe(request).subscribe(response => console.log(response));
   */
  public unSubscribe(request: UnsubscriptionRequest): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.pathService}/unsubscribe`, request);
  }
}
