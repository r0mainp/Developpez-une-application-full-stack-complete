import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  public isOrderDesc: boolean = true;
  public articles$: Observable<Article[]> = this.articleService.all();

  constructor(private articleService: ArticleService){}

  public updateOrder():void {
    this.isOrderDesc = !this.isOrderDesc;
  }
}
