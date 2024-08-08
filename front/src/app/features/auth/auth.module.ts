import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './component/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
