import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

/**
 * Component for displaying the details of a specific article.
 * 
 * This component retrieves an article based on the ID provided in the route parameters
 * and displays its details. It uses the `ArticleService` to fetch the article data.
 * 
 * @remarks
 * - The article ID is extracted from the route parameters upon initialization.
 * - The article data is then provided as an observable to the template for rendering.
 * 
 * @example
 * ```html
 * <!-- Template usage -->
 * <app-details></app-details>
 * ```
 * 
 * @example
 * ```typescript
 * // Component usage in a parent component or routing configuration
 * <app-details></app-details>
 * ```
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  /**
   * Observable that emits the article details.
   * The article is retrieved using the ID from the route parameters.
   */
  public article$!: Observable<Article>;

  /**
   * Creates an instance of DetailsComponent.
   * 
   * @param articleService - Service for managing articles.
   * @param route - Service for accessing route parameters.
   */
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Extracts the article ID from the route parameters and fetches the article details.
   */
  ngOnInit(): void {
    const articleId = this.route.snapshot.params['id'];

    this.article$ = this.articleService.findById(articleId);
  }
}
