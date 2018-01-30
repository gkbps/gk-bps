// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln92Component } from './gkcln92.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln92Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'approval'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln92RoutingModule {}
