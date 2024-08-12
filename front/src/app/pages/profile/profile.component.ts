import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserSessionService } from 'src/app/core/services/user-session.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  public user$!: Observable<User>;

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
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userSessionService: UserSessionService
  ){}

  ngOnInit() {
    this.user$ = this.authService.me().pipe(
      tap(user => this.form.patchValue(
        {
          username: user.username,
          email: user.email
        }
      ))
    );
  }

  public submit():void{
    console.log(this.form.value)
  }
  public logout(): void{
    this.userSessionService.logOut();
  }
}
