// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln10Component } from './gkcln10.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln10Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'individual'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln10RoutingModule {}
