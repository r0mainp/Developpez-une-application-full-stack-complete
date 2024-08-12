import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { UserSessionService } from 'src/app/core/services/user-session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{ 
  @Output() sidenavToggle = new EventEmitter<void>();
  public displayBackArrow: boolean = false;
  public routesToHideBack: string[] = [
    "/",
    "/themes",
    "/feed"
    // add profile when implemented
  ]

  public isLogged$: Observable<boolean> = this.userSessionService.$isLogged();

  constructor(
    private router: Router,
    private userSessionService: UserSessionService
  ){}

  ngOnInit(): void {



    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.displayBackArrow = !this.routesToHideBack.includes(event.urlAfterRedirects);
    });
  }

  
  public back() {
    window.history.back();
  }

  public toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
