import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { title: 'Feed', path: 'feed', component: FeedComponent },
  { title: 'Details', path: 'details', component: DetailsComponent },
  { title: 'Form', path: 'create', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
