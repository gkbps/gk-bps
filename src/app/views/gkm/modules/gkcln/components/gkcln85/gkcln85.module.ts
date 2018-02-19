import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';

import { DynamicModule } from 'ng-dynamic-component';

import { OrderListModule } from 'primeng/orderlist';

import { IconsService } from '../../../../../../nga/common/icons.service';
import { HelperService } from '../../../../../../nga/services/helpers.service';

// import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln85Component } from './gkcln85.component';
import { GkCln85RoutingModule } from './gkcln85-routing.module';

@NgModule({
  declarations: [
    GkCln85Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule,

    TranslateModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ConfirmDialogModule,

    DynamicModule,

    OrderListModule,

    // HNavBoardModule,
    GkCln85RoutingModule
  ],
  exports: [
  ],
  providers: [
    HelperService,
    ConfirmationService,
    IconsService
  ]
})
export class GkCln85Module {
}
