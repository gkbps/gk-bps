// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TerminalModule } from 'primeng/primeng';
import { TerminalService } from 'primeng/components/terminal/terminalservice';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { GkTerminalComponent } from './gkTerminal.component';
import { GkTerminalRoutingModule } from './gkTerminal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TerminalModule,

    AppTranslationModule,
    GkTerminalRoutingModule,
  ],
  declarations: [
    GkTerminalComponent,
  ],
  providers: [
    TerminalService,
  ],
})
export class GkTerminalModule { }
