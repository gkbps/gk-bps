// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln25Component } from './gkcln25.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln25Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'massEnable'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln25RoutingModule {}
