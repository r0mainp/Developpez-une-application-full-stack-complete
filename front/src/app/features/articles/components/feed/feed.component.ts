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
  public sortOrder: string = 'desc';
  public articles$: Observable<Article[]> = this.articleService.all();

  constructor(
    private articleService: ArticleService,
  ){}

  public updateOrder():void {
    this.sortOrder = this.sortOrder == 'desc'?'asc': 'desc';
    this.articles$ = this.articleService.all(this.sortOrder)
  }
}
