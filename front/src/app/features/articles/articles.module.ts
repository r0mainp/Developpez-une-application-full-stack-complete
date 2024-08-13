import { NgModule } from '@angular/core';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedComponent } from './components/feed/feed.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from './components/form/form.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommentComponent } from './components/comment/comment.component';

/**
 * Angular module for the articles feature.
 * 
 * This module encapsulates all components, services, and routing related to the articles feature of the application.
 * It includes components for displaying and managing articles, such as:
 * - FeedComponent: Shows a list of articles.
 * - DetailsComponent: Displays detailed information about a specific article.
 * - FormComponent: Provides a form for creating a new article.
 * - ArticleCardComponent: Represents an individual article card.
 * - CommentComponent: Handles comments related to articles.
 * 
 * Additionally, this module configures the form field appearance for Material Design form fields.
 * 
 * @module
 */
@NgModule({
  /**
   * Declarations of components that belong to this module.
   * 
   * Components:
   * - {@link FeedComponent}
   * - {@link DetailsComponent}
   * - {@link FormComponent}
   * - {@link CommentComponent}
   * - {@link ArticleCardComponent}
   */
  declarations: [
    FeedComponent,
    DetailsComponent,
    FormComponent,
    CommentComponent,
    ArticleCardComponent,
  ],
  /**
   * Imports other Angular modules and application modules needed for this module.
   * 
   * Imports:
   * - {@link SharedModule} - Provides shared components and services.
   * - {@link ArticlesRoutingModule} - Configures routing for the articles feature.
   */
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ],
  /**
   * Provides configuration for Material Design form fields.
   * 
   * Providers:
   * - Configures form field appearance to 'outline'.
   */
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class ArticlesModule { }
