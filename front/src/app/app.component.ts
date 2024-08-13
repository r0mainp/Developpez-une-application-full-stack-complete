import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

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
export class AppComponent {
  
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
