import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router"; 
import { UserSessionService } from "../services/user-session.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor( 
    private router: Router,
    private userSessionService: UserSessionService,
  ) {
  }

  public canActivate(): boolean {
    if (!this.userSessionService.isLogged) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}