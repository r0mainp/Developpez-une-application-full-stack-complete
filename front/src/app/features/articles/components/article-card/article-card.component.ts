import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { Theme } from 'src/app/features/articles/interfaces/theme';
import { ThemeService } from '../../../../core/services/theme.service';

/**
 * Component for displaying an article card.
 * 
 * This component displays information about an article, including the author and theme details if applicable.
 * It reacts to changes in the `article` input property by fetching user and theme data.
 * 
 * @remarks
 * - The `article` input is required to display article details.
 * - When `isDetail` is true, the component also fetches and displays theme details.
 * 
 * @example
 * ```html
 * <!-- Template usage -->
 * <article-card [article]="article" [isDetail]="true"></article-card>
 * ```
 * 
 * @example
 * ```typescript
 * // Component usage in parent component
 * <article-card [article]="selectedArticle" [isDetail]="false"></article-card>
 * ```
 */
@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnChanges {
  /**
   * The article object to be displayed in the card.
   * This is an optional input property.
   */
  @Input() public article: Article | null = null;

  /**
   * Boolean flag indicating whether to show detailed information.
   * When true, the component fetches additional theme details.
   */
  @Input() public isDetail: boolean = false;

  /**
   * Observable of the user data fetched by userService based on the article's author ID.
   */
  public user$!: Observable<User>;

  /**
   * Observable of the theme data fetched by themeService based on the article's theme ID.
   */
  public theme$!: Observable<Theme>;

  /**
   * Creates an instance of ArticleCardComponent.
   * 
   * @param userService - Service for fetching user data.
   * @param themeService - Service for fetching theme data.
   * @param router - Router for navigation.
   */
  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private router: Router,
  ) {}

  /**
   * Lifecycle hook that is called when the `article` input property changes.
   * Fetches the user and theme data based on the updated `article` details.
   * 
   * @param changes - Object that contains the changes in input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && this.article && this.article.authorId) {
      this.user$ = this.userService.getUserById(this.article.authorId.toString());
      if (this.isDetail) {
        this.theme$ = this.themeService.findById(this.article.themeId.toString());
      }
    }
  }

  /**
   * Navigates to the detailed view of the article.
   * 
   * @param id - The ID of the article to navigate to.
   */
  goToDetail(id: number): void {
    this.router.navigate([`/details/${id.toString()}`]);
  }
}
