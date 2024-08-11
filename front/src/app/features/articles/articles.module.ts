import { NgModule } from '@angular/core';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedComponent } from './components/feed/feed.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from './components/form/form.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';


@NgModule({
  declarations: [
    FeedComponent,
    DetailsComponent,
    FormComponent,
    ArticleCardComponent,
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
