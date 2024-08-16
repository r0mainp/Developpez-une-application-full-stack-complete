import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './features/auth/services/auth.service';
import { UserSessionService } from './core/services/user-session.service';

/**
 * The root component of the application.
 * 
 * @remarks
 * This component serves as the main layout for the application, including a 
 * side navigation menu. It provides methods to toggle the side navigation menu.
 * 
 * @component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  /**
   * The title of the application.
   * 
   * @type {string}
   */
  title = 'front';

  /**
   * A reference to the `MatSidenav` component used for the side navigation menu.
   * 
   * @type {MatSidenav}
   */
  @ViewChild(MatSidenav) sidenav!: MatSidenav;


  constructor(
    private authService: AuthService,
    private userSessionService: UserSessionService
  ){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && !this.userSessionService.isLogged) {
      this.authService.me().subscribe(user => {
        if (user) {
          this.userSessionService.logIn(user);
        } else {
          this.userSessionService.logOut(); // Optional: handle if no user is found
        }
      });
    }
  }

  /**
   * Toggles the open/closed state of the side navigation menu.
   * 
   * @remarks
   * This method calls the `toggle` method of the `MatSidenav` component to 
   * show or hide the side navigation menu.
   * 
   * @returns {void}
   */
  onSidenavToggle() {
    this.sidenav.toggle();
  }
}
