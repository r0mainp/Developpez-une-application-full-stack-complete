import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * An HTTP interceptor that handles authentication-related errors and
 * manages user session state.
 * 
 * @remarks
 * This interceptor listens for HTTP responses and catches errors related
 * to authentication (401 Unauthorized or 403 Forbidden). If such an error
 * occurs, it logs the user out, redirects them to the home page, and displays
 * a notification indicating that the session has expired.
 * 
 * @implements {HttpInterceptor}
 * 
 * @example
 * ```typescript
 * {
 *   provide: HTTP_INTERCEPTORS,
 *   useClass: AuthInterceptor,
 *   multi: true
 * }
 * ```
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructs an instance of the `AuthInterceptor` service.
   * 
   * @param {Router} router - The Angular router used for navigation.
   * @param {UserSessionService} userSessionService - Service that manages 
   *   user session state and handles user logout.
   * @param {MatSnackBar} matSnackBar - Angular Material Snackbar service used 
   *   for displaying notifications.
   */
  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private matSnackBar: MatSnackBar,
  ) {}

  /**
   * Intercepts HTTP requests and handles errors related to authentication.
   * 
   * @param {HttpRequest<any>} request - The outgoing HTTP request.
   * @param {HttpHandler} next - The next handler in the HTTP pipeline.
   * @returns {Observable<HttpEvent<any>>} An observable of the HTTP event.
   * 
   * @remarks
   * If the HTTP response contains a 401 or 403 status code, indicating an 
   * authentication issue, the interceptor will:
   * - Log out the user by calling `userSessionService.logOut()`.
   * - Redirect the user to the home page.
   * - Display a snackbar notification with the message "Session expirée".
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
            this.userSessionService.logOut();
            this.router.navigate(['/']);
            this.matSnackBar.open("Session expirée", "Close", { duration: 3000 });
        }
        return throwError(error);
      })
    );
  }
}
