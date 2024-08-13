import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';

/**
 * A route guard that checks if a user is authenticated before allowing
 * access to a route.
 * 
 * @remarks
 * This guard uses the `UserSessionService` to determine if the user is 
 * logged in. If the user is not authenticated, they are redirected to
 * the home page.
 * 
 * @implements {CanActivate}
 * 
 * @example
 * ```typescript
 * {
 *   path: 'protected',
 *   component: ProtectedComponent,
 *   canActivate: [AuthGuard]
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  /**
   * Constructs an instance of the `AuthGuard` service.
   * 
   * @param {Router} router - The Angular router used for navigation.
   * @param {UserSessionService} userSessionService - Service that 
   *   manages user session state.
   */
  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
  ) {}

  /**
   * Determines if the route can be activated based on the user's 
   * authentication status.
   * 
   * @returns {boolean} `true` if the user is authenticated, otherwise `false`.
   * If the user is not authenticated, they are redirected to the home page.
   */
  public canActivate(): boolean {
    if (!this.userSessionService.isLogged) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
