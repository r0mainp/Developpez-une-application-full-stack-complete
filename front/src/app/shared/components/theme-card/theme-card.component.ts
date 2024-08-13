import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '../../../features/articles/interfaces/theme';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { SubscriptionRequest } from 'src/app/core/interfaces/subscription-request';
import { map, Observable, of } from 'rxjs';
import { UnsubscriptionRequest } from 'src/app/core/interfaces/unsubscription-request';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component to display and manage theme subscriptions.
 * 
 * This component is responsible for displaying theme information and managing user subscriptions to the theme.
 * It allows users to subscribe or unsubscribe from a theme and provides feedback via snack bars.
 * 
 * @example
 * ```html
 * <theme-card [theme]="theme" [isThemePage]="true" (refreshSubscriptions)="refresh()"></theme-card>
 * ```
 */
@Component({
  selector: 'theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss']
})
export class ThemeCardComponent implements OnInit {

  /** 
   * The theme object to be displayed.
   */
  @Input() public theme!: Theme;

  /** 
   * Flag to determine if the component is on a theme page.
   */
  @Input() public isThemePage: boolean = false;

  /** 
   * Event emitter to refresh subscriptions list when the user subscribes or unsubscribes.
   */
  @Output() public refreshSubscriptions = new EventEmitter<void>();

  /** 
   * ID of the user's subscription to the current theme, if any.
   */
  public subscriptionId: number | undefined;

  /** 
   * Observable indicating if the user is subscribed to the theme.
   */
  public isSubscribed$: Observable<boolean> = of(false);

  /**
   * Creates an instance of ThemeCardComponent.
   * 
   * @param subscriptionService - Service to manage subscriptions.
   * @param matSnackBar - Service to display snack bar messages.
   */
  constructor(
    private subscriptionService: SubscriptionService,
    private matSnackBar: MatSnackBar,
  ) {}

  /**
   * Initializes the component.
   * 
   * Checks if the user is subscribed to the theme when the component is initialized.
   */
  ngOnInit() {
    this.checkIfUserIsSubscribed();
  }

  /**
   * Checks if the user is currently subscribed to the theme.
   * 
   * Updates the `isSubscribed$` observable and sets the `subscriptionId` if a subscription is found.
   */
  public checkIfUserIsSubscribed() {
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

  /**
   * Subscribes the user to the theme.
   * 
   * Sends a subscription request to the server and displays a snack bar message upon success.
   * Refreshes the subscription status after subscribing.
   * 
   * @param id - ID of the theme to subscribe to.
   */
  public subscribe(id: number) {
    const request: SubscriptionRequest = {
      theme_id: id,
    };
    this.subscriptionService.subscribe(request).subscribe((response) => {
      this.matSnackBar.open(response.message, "Close", { duration: 3000 });
      this.checkIfUserIsSubscribed();
    });
  }

  /**
   * Unsubscribes the user from the theme.
   * 
   * Sends an unsubscription request to the server and displays a snack bar message upon success.
   * Emits an event to refresh the subscriptions list.
   */
  public unubscribe() {
    if (this.subscriptionId === undefined) {
      console.error('Subscription ID is undefined');
      return;
    }
    const request: UnsubscriptionRequest = {
      id: this.subscriptionId,
    };
    this.subscriptionService.unSubscribe(request).subscribe((response) => {
      this.matSnackBar.open(response.message, "Close", { duration: 3000 });
      this.refreshSubscriptions.emit();
    });
  }
}
