// External
import { NgModule } from '@angular/core';

import { HNavBoardModule } from '../../nga/components/hNavBoard';

// Internal
import { NgaModule } from '../../nga/nga.module';
// import { HoangModule } from '../../nga/hoang.module';

import { GkmComponent } from './gkm.component';
import { GkmRoutingModule } from './gkm-routing.module';

import { Gkm00Component } from './gkm00';


@NgModule({
  imports: [
    NgaModule,
    // HoangModule,

    HNavBoardModule,

    GkmRoutingModule,
  ],
  declarations: [
    GkmComponent,
    Gkm00Component,
  ]
})
export class GkmModule { }
