// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TabViewModule,
} from 'primeng/primeng';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';
import { DictComponent } from './dict.component';
import { DictRoutingModule } from './dict-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TabViewModule,

    AppTranslationModule,
    DictRoutingModule,
  ],
  declarations: [
    DictComponent,
  ],
  providers: [
  ],
})
export class DictModule { }
