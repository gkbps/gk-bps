// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';
import { DebugComponent } from './debug.component';
import { DebugRoutingModule } from './debug-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TabViewModule,

    AppTranslationModule,
    DebugRoutingModule,
  ],
  declarations: [
    DebugComponent,
  ],
  providers: [
  ],
})
export class DebugModule { }
