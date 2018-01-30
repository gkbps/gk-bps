// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln46Component } from './gkcln46.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln46Component,
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
export class GkCln46RoutingModule {}
