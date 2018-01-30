// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln76Component } from './gkcln76.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln76Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'mark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln76RoutingModule {}
