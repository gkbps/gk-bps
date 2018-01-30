// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln43Component } from './gkcln43.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln43Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'rolesAssignment'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln43RoutingModule {}
