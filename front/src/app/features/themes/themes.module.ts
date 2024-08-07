import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ListComponent } from './components/list/list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
]

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    ...materialModules
  ]
})
export class ThemesModule { }
