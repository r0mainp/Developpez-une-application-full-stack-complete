import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnInit{
  @Input() public article!:Article;
  @Input() public isDetail!:boolean;
  public user$!: Observable<User>;

  constructor(
    private userService: UserService,
    private router: Router,
  ){}

  public ngOnInit(): void {
    const authorId = this.article.authorId;
    this.user$ = this.userService.getUserById(this.article.authorId.toString());
  }

  goToDetail(id: number): void {
    this.router.navigate([`/details/${id.toString()}`])
  }
}
