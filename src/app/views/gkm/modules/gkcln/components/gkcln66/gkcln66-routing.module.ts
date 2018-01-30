// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln66Component } from './gkcln66.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln66Component,
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
export class GkCln66RoutingModule {}
