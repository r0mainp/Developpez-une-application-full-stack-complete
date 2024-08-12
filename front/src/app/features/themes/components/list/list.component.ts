import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../interfaces/theme';
import { ThemeApiService } from '../../services/theme-api.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public themes$: Observable<Theme[]> = this.themeApiService.all();

  constructor(
    private themeApiService: ThemeApiService,
    private subscriptionService: SubscriptionService
  ){}

  public subscribe(id: number){
    this.subscriptionService.subscribe(id).subscribe((response) =>  console.log(response))
  }

}
