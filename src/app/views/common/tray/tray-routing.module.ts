import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrayComponent } from './tray.component';
import { Tray00Component } from './components/tray00/tray00.component';
import { InboxComponent } from './components/inbox.component';
import { OutboxComponent } from './components/outbox.component';
import { DraftComponent } from './components/draft.component';
import { InProgressComponent } from './components/inProgress.component';
import { CompletedComponent } from './components/completed.component';

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
        path: 'tray01',
        component: InboxComponent,
        data: {
          title: 'inbox'
        }
      },
      {
        path: 'tray02',
        component: OutboxComponent,
        data: {
          title: 'outbox'
        }
      },
      {
        path: 'tray11',
        component: DraftComponent,
        data: {
          title: 'draft'
        }
      },
      {
        path: 'tray12',
        component: InProgressComponent,
        data: {
          title: 'inProgress'
        }
      },
      {
        path: 'tray13',
        component: CompletedComponent,
        data: {
          title: 'completed'
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
