import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External modules
import { SharedModule } from 'primeng/shared';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { FavTcodeService } from './favTcode.service';
import { Fav } from './fav.component';
import { routing } from './fav.routing';

import { IconsService } from '../../../nga/common/icons.service';

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
    DropdownModule,
    ConfirmDialogModule,
  ],
  declarations: [
    Fav,
  ],
  providers: [
    FavTcodeService,
    ConfirmationService,
    IconsService
  ],
  exports: [
  ],
})
export class FavModule {
}
