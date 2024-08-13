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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  public user$!: Observable<User>;
  public subscriptionsWithThemes$!: Observable<(Subscription & { theme?: Theme })[]>;

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

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userSessionService: UserSessionService,
    private userService: UserService,
    private themeService: ThemeService,
    private subscriptionService: SubscriptionService,
    private matSnackBar: MatSnackBar,
  ){}

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

    const subscriptions$ = this.subscriptionService.all();
    const themes$ = this.themeService.all();

    this.loadSubscriptionsWithThemes();
  }

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

  public submit():void{
    const username = this.form.value.username as string;
    const email = this.form.value.email as string;
    const id = this.form.value.id as number;

    const request: UserRequest = {
      username: username,
      email: email,
      id: id,
    }

    this.userService.update(request).subscribe((response)=>{
      this.matSnackBar.open(response.message, "Close", { duration: 3000 });
    })
  }
  public logout(): void{
    this.userSessionService.logOut();
  }

  public handleRefresh() {
    this.loadSubscriptionsWithThemes();
  }
}
