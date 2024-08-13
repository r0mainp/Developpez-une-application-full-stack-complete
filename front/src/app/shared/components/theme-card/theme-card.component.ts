import { Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { SubscriptionRequest } from 'src/app/core/interfaces/subscription-request';
import { map, Observable, of, switchMap } from 'rxjs';
import { UnsubscriptionRequest } from 'src/app/core/interfaces/unsubscription-request';

@Component({
  selector: 'theme-card',
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.scss'
})
export class ThemeCardComponent implements OnInit{
  @Input() public theme!: Theme;
  @Input() public isThemePage: boolean = false;
  public subscriptionId: number | undefined;

  public isSubscribed$: Observable<boolean> = of(false);

  constructor(
    private subscriptionService: SubscriptionService
  ){}

  ngOnInit() {
    this.isSubscribed$ = this.subscriptionService.all().pipe(
      map(subscriptions => {
        const subscription = subscriptions.find(sub => sub.theme_id === this.theme.id);
        if (subscription) {
          console.log(subscription)
          this.subscriptionId = subscription.id;
          return true;
        }
        return false;
      })
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

  public unubscribe(){
    if (this.subscriptionId === undefined) {
      console.error('Subscription ID is undefined');
      return;
    }
    const request: UnsubscriptionRequest={
      id: this.subscriptionId,
    }
    this.subscriptionService.unSubscribe(request).subscribe((response) =>  console.log(response))
  }
}
