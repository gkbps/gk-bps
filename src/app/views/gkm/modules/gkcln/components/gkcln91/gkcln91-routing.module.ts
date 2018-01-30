// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln91Component } from './gkcln91.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln91Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'configuration'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln91RoutingModule {}
