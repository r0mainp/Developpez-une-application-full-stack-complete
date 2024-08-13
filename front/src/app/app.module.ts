import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ArticlesModule } from './features/articles/articles.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListComponent } from './pages/theme-list/theme-list.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

/**
 * The main module for the application.
 * 
 * @remarks
 * This module imports necessary Angular modules and application-specific modules,
 * declares the components used in the application, and provides HTTP interceptors
 * for handling authentication and authorization.
 * 
 * @module
 */
@NgModule({
  /**
   * Declarations of components that belong to this module.
   * 
   * @remarks
   * The components declared here are:
   * - {@link AppComponent} - The root component of the application.
   * - {@link HomeComponent} - The home page component.
   * - {@link ProfileComponent} - The user profile page component.
   * - {@link ListComponent} - The component for listing themes.
   */
  declarations: [
    AppComponent, 
    HomeComponent, 
    ProfileComponent, 
    ListComponent
  ],
  
  /**
   * Modules that are imported into this module.
   * 
   * @remarks
   * The following modules are imported:
   * - {@link BrowserModule} - Provides services for running the application in a browser.
   * - {@link AppRoutingModule} - Configures application routes.
   * - {@link BrowserAnimationsModule} - Enables animations in Angular.
   * - {@link CoreModule} - Core functionalities of the application.
   * - {@link AuthModule} - Authentication-related components and services.
   * - {@link SharedModule} - Shared components, directives, and pipes.
   * - {@link ArticlesModule} - Module for handling articles.
   */
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    SharedModule,
    ArticlesModule,
  ],
  
  /**
   * Providers for the module.
   * 
   * @remarks
   * The following providers are configured:
   * - `provideHttpClient(withInterceptorsFromDi())` - Configures HTTP client with dependency-injected interceptors.
   * - `JwtInterceptor` - Intercepts HTTP requests to add JWT tokens.
   * - `AuthInterceptor` - Intercepts HTTP requests to handle authentication.
   */
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  
  /**
   * The root component that Angular creates and inserts into the `index.html` host web page.
   * 
   * @remarks
   * The {@link AppComponent} is bootstrapped as the root component of the application.
   */
  bootstrap: [AppComponent],
})
export class AppModule {}
