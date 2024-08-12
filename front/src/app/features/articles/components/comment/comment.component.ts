import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
    @Input() public articleId!: number;
    public comments$!: Observable<Comment[]>
    constructor(
      private commentService: CommentService
    ){}

    ngOnInit(): void {
        console.log()
        this.comments$ = this.commentService.all(this.articleId);
    }
}
