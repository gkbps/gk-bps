// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln40Component } from './gkcln40.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln40Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'services'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln40RoutingModule {}
