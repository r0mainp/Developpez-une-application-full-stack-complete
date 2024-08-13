import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentRequest } from '../../interfaces/comment-request';

/**
 * Component for managing and displaying comments associated with an article.
 * 
 * This component provides functionality to view existing comments and submit new ones.
 * It interacts with the `CommentService` to fetch and post comments related to a specific article.
 * 
 * @remarks
 * - The `articleId` input is required for fetching and submitting comments for a particular article.
 * - This component uses reactive forms to handle comment submission.
 * 
 * @example
 * ```html
 * <!-- Template usage -->
 * <app-comment [articleId]="selectedArticleId"></app-comment>
 * ```
 * 
 * @example
 * ```typescript
 * // Component usage in parent component
 * <app-comment [articleId]="article.id"></app-comment>
 * ```
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  /**
   * The ID of the article to which comments belong.
   * This is an input property that should be set by the parent component.
   */
  @Input() public articleId!: number;

  /**
   * Observable that emits the list of comments for the article.
   */
  public comments$!: Observable<Comment[]>;

  /**
   * Reactive form group for handling comment input.
   * Includes a single control for the comment content, which is required.
   */
  public form = this.builder.group({
    content: [
      '',
      [
        Validators.required,
      ]
    ]
  });

  /**
   * Creates an instance of CommentComponent.
   * 
   * @param commentService - Service for managing comments.
   * @param builder - Service for building reactive forms.
   */
  constructor(
    private commentService: CommentService,
    private builder: FormBuilder,
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Initializes the `comments$` observable with comments for the specified `articleId`.
   */
  ngOnInit(): void {
    this.comments$ = this.commentService.all(this.articleId);
  }

  /**
   * Handles the submission of a new comment.
   * Creates a `CommentRequest` object from the form value and sends it to the server.
   * On successful submission, resets the form and refreshes the list of comments.
   * 
   * @throws Error - Logs an error message to the console if the request fails.
   */
  public submit(): void {
    const content = this.form.value.content as string;

    const request: CommentRequest = {
      article_id: this.articleId,
      content: content
    };

    this.commentService.create(request).subscribe({
      next: () => {
        this.form.reset();
        this.comments$ = this.commentService.all(this.articleId);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
}
