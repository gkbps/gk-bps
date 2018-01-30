// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln34Component } from './gkcln34.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln34Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'creditNote'
    },
  },
  {
    path: ':id',
    component: GkCln34Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'creditNote'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln34RoutingModule {}
