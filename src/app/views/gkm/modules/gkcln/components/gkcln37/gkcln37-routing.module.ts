// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln37Component } from './gkcln37.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln37Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'manualEntry'
    },
  },
  {
    path: ':id',
    component: GkCln37Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'manualEntry'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln37RoutingModule {}
