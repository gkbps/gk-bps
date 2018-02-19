// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../nga/services';

import { OutboxComponent } from './outbox.component';

const routes: Routes = [
  {
    path: '',
    component: OutboxComponent,
    data: {
      title: 'outbox'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutboxRoutingModule {}
