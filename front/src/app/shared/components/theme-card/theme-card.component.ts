import { Component, Input } from '@angular/core';
import { Theme } from '../../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { SubscriptionRequest } from 'src/app/core/interfaces/subscription-request';

@Component({
  selector: 'theme-card',
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.scss'
})
export class ThemeCardComponent{
  @Input() public theme!: Theme;
  @Input() public isThemePage: boolean = false;

  constructor(
    private subscriptionService: SubscriptionService
  ){}

  public subscribe(id: number){
    const request: SubscriptionRequest={
      theme_id: id,
    }
    this.subscriptionService.subscribe(request).subscribe((response) =>  console.log(response))
  }

  public unubscribe(id: number){
    const request: SubscriptionRequest={
      theme_id: id,
    }
    this.subscriptionService.subscribe(request).subscribe((response) =>  console.log(response))
  }
}
