import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Subscription } from 'src/app/core/interfaces/subscription';
import { User } from 'src/app/core/interfaces/user';
import { UserRequest } from 'src/app/core/interfaces/user-request';
import { UserSessionService } from 'src/app/core/services/user-session.service';
import { UserService } from 'src/app/core/services/user.service';
import { Theme } from 'src/app/features/articles/interfaces/theme';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  public user$!: Observable<User>;
  public subscriptions$!: Observable<Subscription[]>;
  public themes$!: Observable<Theme[]>;

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

    this.themeService.all();
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
      console.log(response)
    })
  }
  public logout(): void{
    this.userSessionService.logOut();
  }

  getTheme(subscription: Subscription):Observable<Theme | undefined>{
    return this.themes$.pipe(
      map(themes => themes.find(theme => theme.id === subscription.theme_id))
    );
  }
}
