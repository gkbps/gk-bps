import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataListModule } from 'primeng/datalist';
import { ButtonModule } from 'primeng/button';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';


import { NgaModule } from '../../nga/nga.module';
// import { HoangModule } from '../../nga/hoang.module';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    DataListModule,
    ButtonModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,

    NgaModule,
    // HoangModule,

    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
  ]
})
export class MainModule { }
