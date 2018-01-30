import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { FavTcodeService } from './favTcode.service';
import { Fav } from './fav.component';
import { routing } from './fav.routing';

// External modules
import {
  SharedModule,
  ToolbarModule,
  TooltipModule,
  ButtonModule,
  TreeModule,
  TreeTableModule,
  ContextMenuModule,
  DialogModule,
  InputTextModule,

  ConfirmDialogModule,
} from 'primeng/primeng';

import {
  ConfirmationService
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    routing,

    SharedModule,
    ToolbarModule,
    TooltipModule,
    ButtonModule,
    TreeModule,
    TreeTableModule,
    ContextMenuModule,
    DialogModule,
    InputTextModule,

    ConfirmDialogModule,
  ],
  declarations: [
    Fav,
  ],
  providers: [
    FavTcodeService,
    ConfirmationService,
  ],
  exports: [
  ],
})
export class FavModule {
}
