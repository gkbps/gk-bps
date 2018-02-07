// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TabViewModule } from 'primeng/tabview';

import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';
import { PolicyComponent } from './policy.component';
import { PolicyRoutingModule } from './policy-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TabViewModule,

    NgaModule,
    // HoangModule,

    AppTranslationModule,
    PolicyRoutingModule,
  ],
  declarations: [
    PolicyComponent,
  ],
  providers: [
  ],
})
export class PolicyModule { }
