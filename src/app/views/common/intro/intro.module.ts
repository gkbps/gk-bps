// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    ScrollToModule,

    AppTranslationModule,
    IntroRoutingModule,
  ],
  declarations: [
    IntroComponent,
  ],
  providers: [
  ],
})
export class IntroModule {}
