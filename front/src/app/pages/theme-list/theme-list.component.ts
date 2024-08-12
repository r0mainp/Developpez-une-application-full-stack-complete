import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ThemeService } from 'src/app/features/articles/services/theme.service';

@Component({
  selector: 'theme-list',
  templateUrl: './theme-list.component.html',
  styleUrl: './theme-list.component.scss'
})
export class ListComponent {
  public themes$: Observable<Theme[]> = this.themeService.all();

  constructor(
    private themeService: ThemeService,
    private subscriptionService: SubscriptionService
  ){}

}
