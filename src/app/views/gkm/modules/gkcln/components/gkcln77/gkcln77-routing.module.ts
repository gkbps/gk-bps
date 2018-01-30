// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln77Component } from './gkcln77.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln77Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'unmark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln77RoutingModule {}
