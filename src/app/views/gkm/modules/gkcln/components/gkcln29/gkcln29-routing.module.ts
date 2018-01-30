// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln29Component } from './gkcln29.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln29Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'history'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln29RoutingModule {}
