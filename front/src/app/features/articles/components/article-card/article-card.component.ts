import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() public article!:Article;

  constructor(
    private router: Router
  ){}

  goToDetail(id: number): void {
    this.router.navigate([`/details/${id.toString()}`])
  }
}
