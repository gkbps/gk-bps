// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln33Component } from './gkcln33.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln33Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'debitNote'
    },
  },
  {
    path: ':id',
    component: GkCln33Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'debitNote'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln33RoutingModule {}
