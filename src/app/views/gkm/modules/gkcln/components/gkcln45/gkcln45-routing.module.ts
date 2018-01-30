// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln45Component } from './gkcln45.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln45Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'processes'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln45RoutingModule {}
