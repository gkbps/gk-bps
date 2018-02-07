import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';


import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln53Component } from './gkcln53.component';
import { GkCln53RoutingModule } from './gkcln53-routing.module';

import {
  DynamicContentComponent,
  DynamicSample1Component,
  DynamicSample2Component,
  UnknownDynamicComponent
} from './dynamic.component';

@NgModule({
  declarations: [
    DynamicContentComponent,
    DynamicSample1Component,
    DynamicSample2Component,
    UnknownDynamicComponent,

    GkCln53Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,

    TranslateModule,

    HNavBoardModule,
    GkCln53RoutingModule
  ],
  exports: [
  ],
  entryComponents: [
    DynamicSample1Component,
    DynamicSample2Component,
    UnknownDynamicComponent
  ]
})
export class GkCln53Module {
}
