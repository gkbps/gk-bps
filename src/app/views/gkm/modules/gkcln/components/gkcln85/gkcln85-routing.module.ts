// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln85Component } from './gkcln85.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln85Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'disable'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln85RoutingModule {}
