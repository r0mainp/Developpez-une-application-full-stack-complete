import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Core module that contains essential components, directives, and services used across the application.
 * 
 * @remarks
 * The `CoreModule` typically includes singleton services and shared logic that is needed throughout the app.
 * This module imports `CommonModule`, which provides common directives such as `ngIf` and `ngFor`.
 * 
 * @example
 * // Import CoreModule in the main application module
 * import { CoreModule } from './core/core.module';
 * 
 * @NgModule({
 *   imports: [CommonModule],
 *   // declarations: []  // Declare components, directives, and pipes here if needed
 * })
 * export class CoreModule { }
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class CoreModule { }