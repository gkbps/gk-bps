import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { DynamicModule } from 'ng-dynamic-component';

// import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln51Component } from './gkcln51.component';
import { GkCln51RoutingModule } from './gkcln51-routing.module';

import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

// import { ToolbarModule } from 'primeng/toolbar';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputTextModule } from 'primeng/inputtext';
// import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    GkCln51Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,

    TranslateModule,

    DynamicModule,

    // SharedModule,
    PanelModule,
    PickListModule,
    DropdownModule,
    ButtonModule,
    // ToolbarModule,
    // TooltipModule,
    // InputTextModule,
    // ChartModule,

    // HNavBoardModule,
    GkCln51RoutingModule
  ],
  exports: [
  ],
})
export class GkCln51Module {
}
