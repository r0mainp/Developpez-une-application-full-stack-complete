import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

/**
 * The module for handling user authentication.
 * 
 * This module is responsible for providing the authentication feature of the application,
 * including user login and registration. It declares the `LoginComponent` and `RegisterComponent`,
 * and imports necessary modules for routing and shared components.
 * 
 * @example
 * ```typescript
 * import { AuthModule } from './auth.module';
 * 
 * @NgModule({
 *   imports: [AuthModule],
 *   // other configurations
 * })
 * export class AppModule { }
 * ```
 */
@NgModule({
  declarations: [
    /** 
     * Declares the `LoginComponent` which provides the user login functionality.
     */
    LoginComponent,

    /** 
     * Declares the `RegisterComponent` which provides the user registration functionality.
     */
    RegisterComponent
  ],
  imports: [
    /** 
     * Imports the routing module for authentication routes.
     */
    AuthRoutingModule,

    /** 
     * Imports shared components and modules used across the application.
     */
    SharedModule,
  ]
})
export class AuthModule { }
