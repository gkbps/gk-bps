// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TabViewModule } from 'primeng/tabview';

import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';
import { BlankComponent } from './blank.component';
import { BlankRoutingModule } from './blank-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TabViewModule,

    NgaModule,
    // HoangModule,

    AppTranslationModule,
    BlankRoutingModule,
  ],
  declarations: [
    BlankComponent,
  ],
  providers: [
  ],
})
export class BlankModule { }
