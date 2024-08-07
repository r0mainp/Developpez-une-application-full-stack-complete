import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../interfaces/theme';
import { ThemeApiService } from '../../services/theme-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public themes$: Observable<Theme[]> = this.themeApiService.all();

  constructor(private themeApiService: ThemeApiService){

  }

}
