import { NgModule } from '@angular/core';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedComponent } from './components/feed/feed.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from './components/form/form.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommentComponent } from './components/comment/comment.component';


@NgModule({
  declarations: [
    FeedComponent,
    DetailsComponent,
    FormComponent,
    CommentComponent,
    ArticleCardComponent,
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ],
  providers:[
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class ArticlesModule { }
