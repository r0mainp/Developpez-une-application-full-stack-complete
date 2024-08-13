import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/features/articles/interfaces/theme';
import { ArticleRequest } from '../../interfaces/article-request';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for creating a new article.
 * 
 * This component provides a form for submitting a new article. It retrieves the list of themes
 * available for selection and handles the creation of the article. On successful creation,
 * it navigates to the feed page and displays a success message.
 * 
 * @remarks
 * - Requires user input for theme, title, and content.
 * - Displays validation errors for required fields.
 * - Shows a success message upon article creation.
 * 
 * @example
 * ```html
 * <!-- Template usage -->
 * <app-form></app-form>
 * ```
 * 
 * @example
 * ```typescript
 * // Component usage in a parent component or routing configuration
 * <app-form></app-form>
 * ```
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {

  /**
   * Observable that emits the list of available themes.
   */
  public themes$: Observable<Theme[]> = this.themeService.all();

  /**
   * Reactive form group for article creation.
   * Contains fields for theme, title, and content, all of which are required.
   */
  public form = this.builder.group({
    theme_id: [
      '',
      [
        Validators.required,
      ]
    ],
    title: [
      '',
      [
        Validators.required,
      ]
    ],
    content: [
      '',
      [
        Validators.required,
      ]
    ]
  });

  /**
   * Creates an instance of FormComponent.
   * 
   * @param builder - Service for creating reactive forms.
   * @param themeService - Service for retrieving themes.
   * @param articleService - Service for creating articles.
   * @param router - Service for navigation.
   * @param matSnackBar - Service for displaying snack bar messages.
   */
  constructor(
    private builder: FormBuilder,
    private themeService: ThemeService,
    private articleService: ArticleService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ){}

  /**
   * Submits the form data to create a new article.
   * 
   * If the form is valid, the article data is sent to the `ArticleService` for creation.
   * On successful creation, navigates to the feed page and displays a success message.
   */
  public submit(): void {
    if (this.form.valid) {
      const articleRequest = this.form.value as ArticleRequest;
      this.articleService.create(articleRequest).subscribe((article: Article) => {
        if (article) {
          this.router.navigate([`/feed`]);
          this.matSnackBar.open("Article créé", "Close", { duration: 3000 });
        }
      });
    }
  }
}
