// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln58Component } from './gkcln58.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln58Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'delete'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln58RoutingModule {}
