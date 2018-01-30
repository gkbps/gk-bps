// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../nga/services';

import { GkSolComponent } from './gksol.component';
import { GkSol00Component } from './components/gksol00';
/*
import { GkSol01Component } from './components/gksol01';
*/

import { GkSol10Component } from './components/gksol10';
/*
import { GkSol11Component } from './components/gksol11';
import { GkSol12Component } from './components/gksol12';
*/
import { GkSol20Component } from './components/gksol20';
/*
import { GkSol30Component } from './components/gksol30';
import { GkSol40Component } from './components/gksol40';
*/
import { GkSol50Component } from './components/gksol50';
import { GkSol60Component } from './components/gksol60';
/*
import { GkSol80Component } from './components/gksol80';
import { GkSol90Component } from './components/gksol90';
*/

const routes: Routes = [
  {
    path: '',
    component: GkSolComponent,
    data: {
      title: 'gksol'
    },
    children: [
      {
        path: '',
        redirectTo: 'gksol00',
        pathMatch: 'full',
      },
      /*
      {
        path: '',
        component: GkSol00Component,
        data: {
          title: 'Main'
        }
      },
      */
      {
        path: 'gksol00',
        component: GkSol00Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'navBoard'
        }
      },
      /*
      {
        path: 'gksol01',
        component: GkSol01Component,
        data: {
          title: 'Master List'
        }
      },
      */
      {
        path: 'gksol10',
        component: GkSol10Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'individual'
        }
      },
      /*
      {
        path: 'gksol11',
        component: GkSol11Component,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'gksol12',
        component: GkSol12Component,
        data: {
          title: 'View'
        }
      },
      {
        path: 'gksol12/:id',
        component: GkSol12Component,
        data: {
          title: 'View'
        }
      },
      */

      {
        path: 'gksol20',
        component: GkSol20Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'collective'
        }
      },
      /*
      {
        path: 'gksol30',
        component: GkSol30Component,
        data: {
          title: 'Processes'
        }
      },
      {
        path: 'gksol40',
        component: GkSol40Component,
        data: {
          title: 'Services'
        }
      },
      */
      {
        path: 'gksol50',
        component: GkSol50Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'dashboard'
        }
      },
      {
        path: 'gksol60',
        component: GkSol60Component,
        canActivate: [TcodeGuard],
        data: {
          title: 'reports'
        }
      },
      /*
      {
        path: 'gksol80',
        component: GkSol80Component,
        data: {
          title: 'Setting'
        }
      },
      {
        path: 'gksol90',
        component: GkSol90Component,
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
export class GkSolRoutingModule {}
