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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {

  public themes$: Observable<Theme[]> = this.themeService.all();
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

  constructor(
    private builder: FormBuilder,
    private themeService: ThemeService,
    private articleService: ArticleService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ){}

  public submit(): void{
    if (this.form.valid) {
      console.log( this.form.value)
      const articleRequest = this.form.value as ArticleRequest;
      this.articleService.create(articleRequest).subscribe((article: Article) =>{
          if(article){
            this.router.navigate([`/feed`]);
            this.matSnackBar.open("Article créé", "Close", { duration: 3000 });
          }else{
            //TODO: handle error
            console.error(article)
          }
      }
      )
    }
  }
}
