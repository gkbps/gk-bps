import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadComponent } from './download.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadComponent,
    data: {
      title: 'download'
    }
  },
  {
    path: ':id',
    component: DownloadComponent,
    data: {
      title: 'download'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule {}
