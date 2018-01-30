import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P401Component } from './401.component';

const routes: Routes = [
  {
    path: '',
    component: P401Component,
    data: {
      title: '401'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P401RoutingModule {}
