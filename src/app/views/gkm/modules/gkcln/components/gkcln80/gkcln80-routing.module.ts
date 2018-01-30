// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln80Component } from './gkcln80.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln80Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'setting'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln80RoutingModule {}
