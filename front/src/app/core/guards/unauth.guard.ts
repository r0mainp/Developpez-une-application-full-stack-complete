import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';

/**
 * A route guard that ensures a user is not authenticated before allowing
 * access to a route.
 * 
 * @remarks
 * This guard uses the `UserSessionService` to check if the user is logged in. 
 * If the user is authenticated, they are redirected to the themes page. 
 * This is typically used to prevent logged-in users from accessing login or 
 * registration routes.
 * 
 * @implements {CanActivate}
 * 
 * @example
 * ```typescript
 * {
 *   path: 'login',
 *   component: LoginComponent,
 *   canActivate: [UnauthGuard]
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class UnauthGuard implements CanActivate {

  /**
   * Constructs an instance of the `UnauthGuard` service.
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
   * @returns {boolean} `true` if the user is not authenticated, otherwise `false`.
   * If the user is authenticated, they are redirected to the themes page.
   */
  public canActivate(): boolean {
    if (this.userSessionService.isLogged) {
      this.router.navigate(['feed']);
      return false;
    }
    return true;
  }
}
