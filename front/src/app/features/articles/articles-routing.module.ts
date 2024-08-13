import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from './components/form/form.component';

/**
 * Routing module for the articles feature.
 * 
 * This module defines the routes for the articles feature of the application, including:
 * - The feed page for listing articles.
 * - The details page for viewing a specific article.
 * - The form page for creating a new article.
 * 
 * @module
 */
const routes: Routes = [
  /**
   * Route for the feed page.
   * Displays a list of articles.
   * 
   * @path ''
   * @component {@link FeedComponent}
   * @title Feed
   */
  { title: 'Feed', path: '', component: FeedComponent },

  /**
   * Route for the article details page.
   * Displays detailed information about a specific article.
   * 
   * @path 'details/:id'
   * @param id - The unique identifier of the article to display.
   * @component {@link DetailsComponent}
   * @title Details
   */
  { title: 'Details', path: 'details/:id', component: DetailsComponent },

  /**
   * Route for the article creation form page.
   * Provides a form to create a new article.
   * 
   * @path 'create'
   * @component {@link FormComponent}
   * @title Form
   */
  { title: 'Form', path: 'create', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
