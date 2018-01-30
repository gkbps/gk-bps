// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TcodeGuard } from '../../nga/services';

// Internal
import { GkmComponent } from './gkm.component';

import { Gkm00Component } from './gkm00';

const routes: Routes = [
  {
    path: '',
    component: GkmComponent,
    data: {
      title: 'gkm'
    },
    children: [
      {
        path: '',
        redirectTo: 'gkm00',
        pathMatch: 'full',
      },
      {
        path: 'gkm00',
        component: Gkm00Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'navBoard'
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkmRoutingModule {}
