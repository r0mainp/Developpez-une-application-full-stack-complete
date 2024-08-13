import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { UserSessionService } from 'src/app/core/services/user-session.service';

/**
 * The header component of the application.
 * 
 * This component is responsible for displaying the application header, including the navigation controls.
 * It shows a back arrow based on the current route and emits an event to toggle the sidenav.
 * It also provides an observable to indicate the user's login status.
 * 
 * @example
 * ```html
 * <app-header (sidenavToggle)="toggleSidenav()"></app-header>
 * ```
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** 
   * Emits an event to toggle the sidenav.
   */
  @Output() sidenavToggle = new EventEmitter<void>();

  /** 
   * Indicates whether the back arrow should be displayed.
   */
  public displayBackArrow: boolean = false;

  /** 
   * List of routes where the back arrow should not be displayed.
   */
  public routesToHideBack: string[] = [
    "/",
    "/themes",
    "/feed",
    "/profile"
  ];

  /** 
   * Observable for the user's login status.
   */
  public isLogged$: Observable<boolean> = this.userSessionService.$isLogged();

  /**
   * Creates an instance of HeaderComponent.
   * 
   * @param router - Router instance for navigation events.
   * @param userSessionService - Service to manage user session and login status.
   */
  constructor(
    private router: Router,
    private userSessionService: UserSessionService
  ) {}

  /**
   * Initializes the component.
   * 
   * Subscribes to router events to determine if the back arrow should be displayed based on the current route.
   */
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.displayBackArrow = !this.routesToHideBack.includes(event.urlAfterRedirects);
    });
  }

  /**
   * Navigates back in the browser history.
   */
  public back(): void {
    window.history.back();
  }

  /**
   * Emits an event to toggle the sidenav.
   */
  public toggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
