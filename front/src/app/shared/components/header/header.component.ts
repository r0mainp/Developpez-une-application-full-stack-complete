import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{ 

  public displayBackArrow: boolean = false;
  public routesToHideBack: string[] = [
    "/",
    "/themes",
    "/feed"
    // add profile when implemented
  ]

  constructor(private router: Router){}

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
}
