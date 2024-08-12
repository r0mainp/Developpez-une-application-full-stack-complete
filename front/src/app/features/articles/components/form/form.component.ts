import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/features/themes/interfaces/theme';
import { ThemeApiService } from 'src/app/features/themes/services/theme-api.service';
import { ArticleRequest } from '../../interfaces/article-request';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';

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
    private themeService: ThemeApiService,
    private articleService: ArticleService,
    private router: Router,
  ){}

  public submit(): void{
    if (this.form.valid) {
      console.log( this.form.value)
      const articleRequest = this.form.value as ArticleRequest;
      this.articleService.create(articleRequest).subscribe((article: Article) =>{
          if(article){
            this.router.navigate([`/articles/${article.id}`]);
          }else{
            //TODO: handle error
            console.error(article)
          }
      }
      )
    }
  }
}
