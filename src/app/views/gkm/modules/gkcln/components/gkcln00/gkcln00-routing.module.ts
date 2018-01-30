// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln00Component } from './gkcln00.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln00Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'navBoard'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln00RoutingModule {}
