// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { LockscreenRoutingModule } from './lockscreen-routing.module';
import { LockscreenComponent } from './lockscreen.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    AppTranslationModule,
    LockscreenRoutingModule,
  ],
  declarations: [
    LockscreenComponent,
  ],
  providers: [
  ],
})
export class LockscreenModule {}
