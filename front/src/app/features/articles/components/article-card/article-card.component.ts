import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { ThemeApiService } from 'src/app/features/themes/services/theme-api.service';
import { Theme } from 'src/app/features/themes/interfaces/theme';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnChanges{
  @Input() public article: Article | null = null;
  @Input() public isDetail:boolean = false;
  public user$!: Observable<User>;
  public theme$!: Observable<Theme>;

  constructor(
    private userService: UserService,
    private themeService: ThemeApiService,
    private router: Router,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && this.article && this.article.authorId) {
      this.user$ = this.userService.getUserById(this.article.authorId.toString());
      if(this.isDetail){
        this.theme$ = this.themeService.findById(this.article.themeId.toString());
      }
    }
  }

  goToDetail(id: number): void {
    this.router.navigate([`/details/${id.toString()}`])
  }
}
