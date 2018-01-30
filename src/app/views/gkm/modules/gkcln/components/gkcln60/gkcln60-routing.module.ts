// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln60Component } from './gkcln60.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln60Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'summary_reports'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln60RoutingModule {}
