// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln56Component } from './gkcln56.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln56Component,
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
export class GkCln56RoutingModule {}
