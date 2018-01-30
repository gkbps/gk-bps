import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GkTerminalComponent } from './gkTerminal.component';

const routes: Routes = [
  {
    path: '',
    component: GkTerminalComponent,
    data: {
      title: 'terminal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkTerminalRoutingModule {}
