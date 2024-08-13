import { Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { SubscriptionRequest } from 'src/app/core/interfaces/subscription-request';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'theme-card',
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.scss'
})
export class ThemeCardComponent implements OnInit{
  @Input() public theme!: Theme;
  @Input() public isThemePage: boolean = false;

  public isSubscribed$: Observable<boolean> = of(false);

  constructor(
    private subscriptionService: SubscriptionService
  ){}

  ngOnInit() {
    this.isSubscribed$ = this.subscriptionService.all().pipe(
      map(subscriptions => subscriptions.some(sub => sub.theme_id === this.theme.id))
    );
  }

  public subscribe(id: number){
    const request: SubscriptionRequest={
      theme_id: id,
    }
    this.subscriptionService.subscribe(request).subscribe((response) =>  {
      console.log(response)
      this.ngOnInit();
    })
  }

  public unubscribe(id: number){
    const request: SubscriptionRequest={
      theme_id: id,
    }
    this.subscriptionService.unSubscribe(request).subscribe((response) =>  console.log(response))
  }
}
