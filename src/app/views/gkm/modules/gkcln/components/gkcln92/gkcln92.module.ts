import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';
import { HRequestApprovalModule } from '../../../../../../nga/components/hRequestApproval';

import { GkCln92Component } from './gkcln92.component';
import { GkCln92RoutingModule } from './gkcln92-routing.module';

@NgModule({
  declarations: [
    GkCln92Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    HRequestApprovalModule,
    GkCln92RoutingModule
  ],
  exports: [
  ],
})
export class GkCln92Module {
}
