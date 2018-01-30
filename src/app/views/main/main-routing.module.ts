import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      title: 'Main'
    },
    children: [
      /*
      {
        path: 'mine101',
        component: InboxComponent,
        data: {
          title: 'Inbox'
        }
      },
      */
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
