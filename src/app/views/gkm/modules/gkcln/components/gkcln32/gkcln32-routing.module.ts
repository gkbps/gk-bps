// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln32Component } from './gkcln32.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln32Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'update_client'
    },
  },
  {
    path: ':id',
    component: GkCln32Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'update_client'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln32RoutingModule {}
