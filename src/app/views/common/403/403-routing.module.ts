import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P403Component } from './403.component';

const routes: Routes = [
  {
    path: '',
    component: P403Component,
    data: {
      title: '403'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P403RoutingModule {}
