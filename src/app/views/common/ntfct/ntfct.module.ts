// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../nga/components/hLeadForm';

// Internal
import { NtfctComponent } from './ntfct.component';
import { NtfctRoutingModule } from './ntfct-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    HLeadFormModule,

    NtfctRoutingModule,
  ],
  declarations: [
    NtfctComponent,
  ],
  providers: [
  ],
})
export class NtfctModule { }
