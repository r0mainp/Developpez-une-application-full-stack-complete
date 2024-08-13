import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Subscription } from 'src/app/core/interfaces/subscription';
import { User } from 'src/app/core/interfaces/user';
import { UserRequest } from 'src/app/core/interfaces/user-request';
import { UserSessionService } from 'src/app/core/services/user-session.service';
import { UserService } from 'src/app/core/services/user.service';
import { Theme } from 'src/app/features/articles/interfaces/theme';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The `ProfileComponent` is responsible for managing and displaying the user's profile information.
 * It allows users to update their profile details and view their current subscriptions along with associated themes.
 * The component interacts with various services to retrieve user data, subscriptions, and themes.
 *
 * @component
 * @implements OnInit
 * @selector app-profile
 * @templateUrl ./profile.component.html
 * @styleUrl ./profile.component.scss
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  /**
   * An observable of the current user, used to populate the form with user data.
   */
  public user$!: Observable<User>;

  /**
   * An observable of subscriptions combined with their associated themes.
   * Each subscription object includes the associated theme details.
   */
  public subscriptionsWithThemes$!: Observable<(Subscription & { theme?: Theme })[]>;

  /**
   * Reactive form for handling user profile data such as username, email, and id.
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
      ]
    ],
    id: [
      0,
      [
        Validators.required,
      ]
    ],
  });

  /**
   * Constructor for `ProfileComponent`.
   * 
   * @param builder - FormBuilder service to create and manage the reactive form.
   * @param authService - AuthService to retrieve the current user details.
   * @param userSessionService - UserSessionService to manage user sessions, including logout.
   * @param userService - UserService to update the user profile data.
   * @param themeService - ThemeService to retrieve available themes.
   * @param subscriptionService - SubscriptionService to manage user subscriptions.
   * @param matSnackBar - MatSnackBar to display notifications to the user.
   */
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userSessionService: UserSessionService,
    private userService: UserService,
    private themeService: ThemeService,
    private subscriptionService: SubscriptionService,
    private matSnackBar: MatSnackBar,
  ) {}

  /**
   * Initializes the component by fetching the current user's data
   * and loading the user's subscriptions along with their associated themes.
   */
  ngOnInit() {
    this.user$ = this.authService.me().pipe(
      tap(user => this.form.patchValue(
        {
          username: user.username,
          email: user.email,
          id: user.id
        }
      ))
    );

    this.loadSubscriptionsWithThemes();
  }

  /**
   * Loads the subscriptions and their associated themes and combines them into
   * a single observable (`subscriptionsWithThemes$`).
   */
  private loadSubscriptionsWithThemes() {
    const subscriptions$ = this.subscriptionService.all();
    const themes$ = this.themeService.all();

    this.subscriptionsWithThemes$ = combineLatest([subscriptions$, themes$]).pipe(
      map(([subscriptions, themes]) => {
        return subscriptions.map(subscription => {
          const theme = themes.find(theme => theme.id === subscription.theme_id);
          return {
            ...subscription,
            theme
          };
        });
      })
    );
  }

  /**
   * Submits the form data to update the user's profile information.
   * Displays a snackbar notification with the response message.
   */
  public submit(): void {
    const username = this.form.value.username as string;
    const email = this.form.value.email as string;
    const id = this.form.value.id as number;

    const request: UserRequest = {
      username: username,
      email: email,
      id: id,
    };

    this.userService.update(request).subscribe((response) => {
      this.matSnackBar.open(response.message, "Close", { duration: 3000 });
    });
  }

  /**
   * Logs the user out by calling the `logOut` method of `UserSessionService`.
   */
  public logout(): void {
    this.userSessionService.logOut();
  }

  /**
   * Refreshes the subscriptions and their associated themes by reloading the data.
   */
  public handleRefresh() {
    this.loadSubscriptionsWithThemes();
  }
}
