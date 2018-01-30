// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln64Component } from './gkcln64.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln64Component,
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
export class GkCln64RoutingModule {}
