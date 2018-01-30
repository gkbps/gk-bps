// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln14Component } from './gkcln14.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln14Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'disable'
    },
  },
  {
    path: ':id',
    component: GkCln14Component,
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
export class GkCln14RoutingModule {}
