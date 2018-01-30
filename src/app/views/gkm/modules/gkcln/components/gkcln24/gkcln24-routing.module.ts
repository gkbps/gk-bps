// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln24Component } from './gkcln24.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln24Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'massDisable'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln24RoutingModule {}
