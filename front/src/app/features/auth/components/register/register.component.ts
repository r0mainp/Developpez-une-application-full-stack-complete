import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthSuccess } from '../../interfaces/auth-success';
import { RegisterRequest } from '../../interfaces/register-request';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/core/services/user-session.service';
import { User } from 'src/app/core/interfaces/user';

/**
 * Component responsible for user registration.
 * 
 * The {@link RegisterComponent} provides a form for users to register with a username, email, and password.
 * Upon successful registration, it stores the authentication token in local storage, retrieves the user details,
 * and updates the user session. It then redirects the user to the feed page.
 * 
 * @component
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  /**
   * Form group used to capture user input for registration credentials.
   * 
   * The form includes:
   * - `username`: A required field for the user's username.
   * - `email`: A required field that must be a valid email address.
   * - `password`: A required field with a pattern validating a strong password (at least 8 characters long,
   *   including uppercase letters, lowercase letters, digits, and special characters).
   */
  public form = this.builder.group({
    username: [
      '',
      [
        Validators.required,
      ]
    ],
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
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]
    ]
  });

  /**
   * Creates an instance of {@link RegisterComponent}.
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
    private userSessionService: UserSessionService
  ) {}

  /**
   * Submits the registration form and processes user registration.
   * 
   * On form submission:
   * 1. Sends the registration request using {@link AuthService}.
   * 2. Stores the authentication token in local storage upon success.
   * 3. Retrieves and sets the current user session.
   * 4. Redirects the user to the feed page.
   */
  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe(
      (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.userSessionService.logIn(user);
          this.router.navigate(['/feed']);
        });
      }
    );
  }
}
