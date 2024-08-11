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
  public sortOrder: string = 'desc';
  public articles$: Observable<Article[]> = this.articleService.all();

  constructor(
    private articleService: ArticleService,
    private router: Router
  ){}

  public updateOrder():void {
    this.sortOrder = this.sortOrder == 'desc'?'asc': 'desc';
    this.articles$ = this.articleService.all(this.sortOrder)
  }

  goToForm(){
    this.router.navigate(["/create"])
  }
}
