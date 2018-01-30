// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln17Component } from './gkcln17.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln17Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'unmark'
    },
  },
  {
    path: ':id',
    component: GkCln17Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'unmark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln17RoutingModule {}
