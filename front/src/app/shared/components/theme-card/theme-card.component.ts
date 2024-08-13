import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '../../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { SubscriptionRequest } from 'src/app/core/interfaces/subscription-request';
import { map, Observable, of, switchMap } from 'rxjs';
import { UnsubscriptionRequest } from 'src/app/core/interfaces/unsubscription-request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'theme-card',
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.scss'
})
export class ThemeCardComponent implements OnInit{
  @Input() public theme!: Theme;
  @Input() public isThemePage: boolean = false;

  @Output() public refreshSubscriptions = new EventEmitter<void>();

  public subscriptionId: number | undefined;

  public isSubscribed$: Observable<boolean> = of(false);

  constructor(
    private subscriptionService: SubscriptionService,
    private matSnackBar: MatSnackBar,
  ){}

  ngOnInit() {
    this.checkIfUserIsSubscribed()
  }

  public checkIfUserIsSubscribed(){
    this.isSubscribed$ = this.subscriptionService.all().pipe(
      map(subscriptions => {
        const subscription = subscriptions.find(sub => sub.theme_id === this.theme.id);
        if (subscription) {
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
      this.matSnackBar.open(response.message, "Close", { duration: 3000 });
      this.checkIfUserIsSubscribed()
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
    this.subscriptionService.unSubscribe(request).subscribe((response) => {
      this.matSnackBar.open(response.message, "Close", { duration: 3000 });
      this.refreshSubscriptions.emit();
    })
  }
}
