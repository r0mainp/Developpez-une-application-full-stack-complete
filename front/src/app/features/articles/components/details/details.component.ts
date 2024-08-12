import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  public article$!: Observable<Article>


  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const articleId = this.route.snapshot.params['id'];

    this.article$ = this.articleService.findById(articleId);
  }
}
