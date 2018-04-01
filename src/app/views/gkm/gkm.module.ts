import { NgModule } from '@angular/core';

import { HNavigationBoardModule } from '../../ngh/modules/N0/hNavigationBoard';

import { GkmRoutingModule } from './gkm-routing.module';

import { GkmComponent } from './gkm.component';
import { Gkm00Component } from './gkm00';

@NgModule({
  declarations: [
    GkmComponent,
    Gkm00Component,
  ],
  imports: [
    HNavigationBoardModule,

    GkmRoutingModule,
  ]
})
export class GkmModule { }
