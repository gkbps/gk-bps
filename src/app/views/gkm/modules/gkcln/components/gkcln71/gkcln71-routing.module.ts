// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln71Component } from './gkcln71.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln71Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'create'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln71RoutingModule {}
