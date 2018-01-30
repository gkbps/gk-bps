// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln75Component } from './gkcln75.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln75Component,
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
export class GkCln75RoutingModule {}
