import { Component, Input } from '@angular/core';
import { Theme } from '../../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'theme-card',
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.scss'
})
export class ThemeCardComponent {
  @Input() public theme!: Theme;

  constructor(
    private subscriptionService: SubscriptionService
  ){}

  public subscribe(id: number){
    this.subscriptionService.subscribe(id).subscribe((response) =>  console.log(response))
  }
}
