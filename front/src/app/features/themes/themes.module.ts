import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ListComponent],
  imports: [
    ThemesRoutingModule,
    SharedModule,
  ]
})
export class ThemesModule { }
