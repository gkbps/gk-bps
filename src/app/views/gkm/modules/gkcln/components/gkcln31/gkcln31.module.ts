import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { PanelModule } from 'primeng/panel';

import { HRequestHeaderModule } from '../../../../../../nga/components/hRequestHeader';
import { HRequestDocumentsModule } from '../../../../../../nga/components/hRequestDocuments';
import { HRequestApprovalFlowModule } from '../../../../../../nga/components/hRequestApprovalFlow';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln31Component } from './gkcln31.component';
import { GkCln31RoutingModule } from './gkcln31-routing.module';

@NgModule({
  declarations: [
    GkCln31Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    PanelModule,

    HRequestHeaderModule,
    HRequestDocumentsModule,
    HRequestApprovalFlowModule,

    GkClnFormModule,
    GkCln31RoutingModule
  ],
  exports: [
  ],
})
export class GkCln31Module {
}
