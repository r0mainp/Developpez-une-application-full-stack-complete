import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/login-request';
import { AuthService } from '../../services/auth.service';
import { AuthSuccess } from '../../interfaces/auth-success';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/core/services/user-session.service';
import { User } from 'src/app/core/interfaces/user';

/**
 * Component responsible for handling user login.
 * 
 * The {@link LoginComponent} provides a form for users to input their email and password to authenticate.
 * Upon successful login, it stores the authentication token in local storage, retrieves the user details,
 * and updates the user session. It then redirects the user to the feed page.
 * 
 * @component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Form group used to capture user input for login credentials.
   * 
   * The form includes:
   * - `email`: A required field that must be a valid email address.
   * - `password`: A required field for the user's password.
   */
  public form = this.builder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
      ]
    ]
  });

  /**
   * Creates an instance of {@link LoginComponent}.
   * 
   * @param builder - Service used to build reactive forms.
   * @param authService - Service for handling authentication-related operations.
   * @param router - Service for navigation within the application.
   * @param userSessionService - Service for managing user session state.
   */
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userSessionService: UserSessionService,
  ) {}

  /**
   * Submits the login form and processes authentication.
   * 
   * On form submission:
   * 1. Removes any existing authentication token from local storage.
   * 2. Sends the login request using {@link AuthService}.
   * 3. Stores the new authentication token in local storage upon success.
   * 4. Retrieves and sets the current user session.
   * 5. Redirects the user to the feed page.
   */
  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;

    localStorage.removeItem('token');

    this.authService.login(loginRequest).subscribe(
      (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.userSessionService.logIn(user);
          this.router.navigate(['/feed']);
        });
      },
    );
  }
}
