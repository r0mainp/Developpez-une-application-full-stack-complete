import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


/** 
 * Routes configuration for the authentication module.
*/
const routes: Routes = [
  /** 
   * Route for the login page.
   * 
   * Displays the `LoginComponent` for the path 'login'.
  */
 { title: 'Login', path: 'login', component: LoginComponent },
 
 /** 
  * Route for the registration page.
  * 
  * Displays the `RegisterComponent` for the path 'register'.
 */
{ title: 'Register', path: 'register', component: RegisterComponent },
];

/**
 * The routing module for the authentication feature.
 * 
 * This module configures the routes related to user authentication, including login and registration.
 * It sets up the routing for the `LoginComponent` and `RegisterComponent` components.
 * 
 * @example
 * ```typescript
 * import { AuthRoutingModule } from './auth-routing.module';
 * 
 * @NgModule({
 *   imports: [AuthRoutingModule],
 *   // other configurations
 * })
 * export class AuthModule { }
 * ```
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }