import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, catchError, Observable, of, Subscription, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService implements OnDestroy {
  public isLogged = false;
  public user: User | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged)
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    const token = localStorage.getItem('token');
    if (token) {
      this.subscription.add(
        this.authService.me().pipe(
          switchMap((user: User) => {
            if (user) {
              this.logIn(user);
              this.router.navigate(['/feed']);
            }
            return of(null);
          }),
          catchError((error) => {
            if (error.status === 403) {
              this.logOut();
              return of(null);
            }
            return throwError(() =>new Error(error));
          }),
        ).subscribe()
      );
    } else {
      this.isLoggedSubject.next(false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public $isLogged(): Observable<boolean>{
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: User): void {
    this.user = user;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.user = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }

}
