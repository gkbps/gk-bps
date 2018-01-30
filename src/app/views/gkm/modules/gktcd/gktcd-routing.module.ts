// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../nga/services';

import { GkTcdComponent } from './gktcd.component';
import { GkTcd00Component } from './components/gktcd00';
/*
import { GkTcd01Component } from './components/gktcd01';
*/

import { GkTcd10Component } from './components/gktcd10';
/*
import { GkTcd11Component } from './components/gktcd11';
import { GkTcd12Component } from './components/gktcd12';
*/
import { GkTcd20Component } from './components/gktcd20';
/*
import { GkTcd30Component } from './components/gktcd30';
import { GkTcd40Component } from './components/gktcd40';
*/
import { GkTcd50Component } from './components/gktcd50';
import { GkTcd60Component } from './components/gktcd60';
/*
import { GkTcd80Component } from './components/gktcd80';
import { GkTcd90Component } from './components/gktcd90';
*/

const routes: Routes = [
  {
    path: '',
    component: GkTcdComponent,
    data: {
      title: 'gktcd'
    },
    children: [
      {
        path: '',
        redirectTo: 'gktcd00',
        pathMatch: 'full',
      },
      /*
      {
        path: '',
        component: GkTcd00Component,
        data: {
          title: 'Main'
        }
      },
      */
      {
        path: 'gktcd00',
        component: GkTcd00Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'navBoard'
        }
      },
      /*
      {
        path: 'gktcd01',
        component: GkTcd01Component,
        data: {
          title: 'Master List'
        }
      },
      */
      {
        path: 'gktcd10',
        component: GkTcd10Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'individual'
        }
      },
      /*
      {
        path: 'gktcd11',
        component: GkTcd11Component,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'gktcd12',
        component: GkTcd12Component,
        data: {
          title: 'View'
        }
      },
      {
        path: 'gktcd12/:id',
        component: GkTcd12Component,
        data: {
          title: 'View'
        }
      },
      */
      {
        path: 'gktcd20',
        component: GkTcd20Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'collective'
        }
      },
      /*
      {
        path: 'gktcd30',
        component: GkTcd30Component,
        data: {
          title: 'Processes'
        }
      },
      {
        path: 'gktcd40',
        component: GkTcd40Component,
        data: {
          title: 'Services'
        }
      },
      */
      {
        path: 'gktcd50',
        component: GkTcd50Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'dashboard'
        }
      },
      {
        path: 'gktcd60',
        component: GkTcd60Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'reports'
        }
      },
      /*
      {
        path: 'gktcd80',
        component: GkTcd80Component,
        data: {
          title: 'Setting'
        }
      },
      {
        path: 'gktcd90',
        component: GkTcd90Component,
        data: {
          title: 'Administration'
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
export class GkTcdRoutingModule {}
