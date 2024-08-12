import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentRequest } from '../../interfaces/comment-request';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
    @Input() public articleId!: number;
    public comments$!: Observable<Comment[]>

    public form = this.builder.group({
      content: [
        '',
        [
          Validators.required,
        ]
      ]
    });


    constructor(
      private commentService: CommentService,
      private builder: FormBuilder,
    ){}

    ngOnInit(): void {
        this.comments$ = this.commentService.all(this.articleId);
    }

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
