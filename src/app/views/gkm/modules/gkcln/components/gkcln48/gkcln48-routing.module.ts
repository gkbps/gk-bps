// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln48Component } from './gkcln48.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln48Component,
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
export class GkCln48RoutingModule {}
