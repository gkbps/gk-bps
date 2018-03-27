import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrayComponent } from './tray.component';
import { Tray00Component } from './components/tray00/tray00.component';

const routes: Routes = [
  {
    path: '',
    component: TrayComponent,
    data: {
      title: 'tray'
    },
    children: [
      {
        path: 'tray00',
        component: Tray00Component,
        data: {
          title: 'navBoard'
        }
      },
      {
        path: '',
        redirectTo: 'tray00',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrayRoutingModule {}
