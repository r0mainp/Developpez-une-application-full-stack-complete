import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnauthGuard } from './core/guards/unauth.guard';
import { AuthGuard } from './core/guards/auth.guard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { 
    canActivate: [UnauthGuard],
    path: '', 
    component: HomeComponent 
  },
  {
    canActivate: [UnauthGuard],
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'themes',
    loadChildren: () => import('./features/themes/themes.module').then(m => m.ThemesModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'feed',
    loadChildren: () => import('./features/articles/articles.module').then(m => m.ArticlesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
