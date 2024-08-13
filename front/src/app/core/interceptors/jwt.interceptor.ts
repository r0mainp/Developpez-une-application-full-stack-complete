import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * An HTTP interceptor that adds a JWT (JSON Web Token) to the Authorization
 * header of outgoing HTTP requests if a token is present in local storage.
 * 
 * @remarks
 * This interceptor is used to append the `Authorization` header with a `Bearer`
 * token for authenticated requests. The token is retrieved from the local storage
 * and added to the request headers if it exists.
 * 
 * @implements {HttpInterceptor}
 * 
 * @example
 * ```typescript
 * {
 *   provide: HTTP_INTERCEPTORS,
 *   useClass: JwtInterceptor,
 *   multi: true
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  /**
   * Constructs an instance of the `JwtInterceptor` service.
   */
  constructor() {}

  /**
   * Intercepts outgoing HTTP requests and adds a JWT to the Authorization header.
   * 
   * @param {HttpRequest<any>} request - The outgoing HTTP request to be intercepted.
   * @param {HttpHandler} next - The next handler in the HTTP pipeline.
   * @returns {Observable<HttpEvent<any>>} An observable of the HTTP event with 
   *   the modified request.
   * 
   * @remarks
   * If a token is present in local storage, it will be added to the `Authorization`
   * header of the HTTP request as a `Bearer` token. If no token is found, the 
   * request proceeds without modification.
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
