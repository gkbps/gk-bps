// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln26Component } from './gkcln26.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln26Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'massMark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln26RoutingModule {}
