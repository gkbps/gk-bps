// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln36Component } from './gkcln36.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln36Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'receipt'
    },
  },
  {
    path: ':id',
    component: GkCln36Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'receipt'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln36RoutingModule {}
