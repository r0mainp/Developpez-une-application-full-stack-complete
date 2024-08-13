import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Component for displaying a feed of articles.
 * 
 * This component retrieves and displays a list of articles. It provides functionality
 * to sort the articles based on their order (ascending or descending) and to navigate
 * to a form for creating new articles.
 * 
 * @remarks
 * - Articles are initially fetched in descending order. 
 * - The sort order can be toggled between ascending and descending.
 * - Navigation to the article creation form is available.
 * 
 * @example
 * ```html
 * <!-- Template usage -->
 * <app-feed></app-feed>
 * ```
 * 
 * @example
 * ```typescript
 * // Component usage in a parent component or routing configuration
 * <app-feed></app-feed>
 * ```
 */
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  /**
   * Current sort order for displaying articles. Can be either 'asc' or 'desc'.
   * Initialized to 'desc'.
   */
  public sortOrder: string = 'desc';

  /**
   * Observable that emits the list of articles based on the current sort order.
   */
  public articles$: Observable<Article[]> = this.articleService.all();

  /**
   * Creates an instance of FeedComponent.
   * 
   * @param articleService - Service for managing articles.
   * @param router - Service for navigation.
   */
  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  /**
   * Toggles the sort order between ascending and descending.
   * Updates the list of articles based on the new sort order.
   */
  public updateOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.articles$ = this.articleService.all(this.sortOrder);
  }

  /**
   * Navigates to the article creation form.
   */
  public goToForm(): void {
    this.router.navigate(["/create"]);
  }
}
