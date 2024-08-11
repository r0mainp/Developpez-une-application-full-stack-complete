import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  public isOrderDesc: boolean = true;
  public articles$: Observable<Article[]> = this.articleService.all();

  constructor(
    private articleService: ArticleService,
    private router: Router
  ){}

  public updateOrder():void {
    // TODO: Update order with queries
    this.isOrderDesc = !this.isOrderDesc;
  }

  goToDetail(id: number): void {
    this.router.navigate([`/details/${id.toString()}`])
  }
}
