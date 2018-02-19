// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../nga/services';

import { InProgressComponent } from './inprogress.component';

const routes: Routes = [
  {
    path: '',
    component: InProgressComponent,
    data: {
      title: 'inprogress'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InProgressRoutingModule {}
