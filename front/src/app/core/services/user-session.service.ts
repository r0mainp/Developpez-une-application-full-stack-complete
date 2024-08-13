import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';

/**
 * Service for managing user session and authentication state.
 * 
 * @remarks
 * This service handles user login, logout, and provides observables to track
 * the authentication state of the user. It uses a `BehaviorSubject` to keep
 * track of the login state and notify subscribers of changes.
 * 
 * @example
 * const userSessionService = new UserSessionService(authService, router);
 * userSessionService.logIn(user);
 * userSessionService.$isLogged().subscribe(isLogged => console.log(isLogged));
 */
@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  /**
   * Indicates if the user is currently logged in.
   * 
   * @remarks
   * This property is updated when the user logs in or out and is used to 
   * determine the authentication status.
   */
  public isLogged = false;

  /**
   * The currently logged-in user.
   * 
   * @remarks
   * This property holds the user details if the user is logged in. It is 
   * cleared when the user logs out.
   */
  public user: User | undefined;

  /**
   * BehaviorSubject to track the login state.
   * 
   * @remarks
   * This subject emits the current login state whenever it changes. It is used
   * to notify subscribers about changes in the authentication status.
   */
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  /**
   * Constructs the `UserSessionService` with the provided `AuthService` and `Router`.
   * 
   * @param authService - The `AuthService` used for authentication operations.
   * @param router - The `Router` used for navigation.
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Returns an observable that emits the current login state.
   * 
   * @returns An `Observable<boolean>` that emits the current login state.
   * 
   * @example
   * userSessionService.$isLogged().subscribe(isLogged => console.log(isLogged));
   */
  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  /**
   * Logs in the user and updates the session state.
   * 
   * @param user - The user details to be set as logged in.
   * 
   * @remarks
   * This method updates the user details, sets the login state to `true`,
   * and notifies subscribers of the change.
   * 
   * @example
   * userSessionService.logIn(user);
   */
  public logIn(user: User): void {
    this.user = user;
    this.isLogged = true;
    this.next();
  }

  /**
   * Logs out the user and clears the session state.
   * 
   * @remarks
   * This method removes the authentication token from local storage, clears
   * the user details, sets the login state to `false`, and navigates to the home
   * page. It also notifies subscribers of the change.
   * 
   * @example
   * userSessionService.logOut();
   */
  public logOut(): void {
    localStorage.removeItem('token');
    this.user = undefined;
    this.isLogged = false;
    this.router.navigate(['/']);
    this.next();
  }

  /**
   * Notifies subscribers of the login state change.
   * 
   * @remarks
   * This private method updates the `isLoggedSubject` with the current login state.
   */
  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
