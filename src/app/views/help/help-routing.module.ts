import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help.component';

import { Help00000Component } from './help00000';
import { Help10000Component } from './help10000';
import { Help20000Component } from './help20000';
import { Help30000Component } from './help30000';
import { Help40000Component } from './help40000';
import { Help50000Component } from './help50000';
import { Help60000Component } from './help60000';
import { Help70000Component } from './help70000';
import { Help80000Component } from './help80000';
import { Help90000Component } from './help90000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';
// import { Help00000Component } from './help00000';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent,
    data: {
      title: 'help'
    },
    children: [
      {
        path: '',
        redirectTo: 'help00000',
        pathMatch: 'full',
      },
      {
        path: 'help00000',
        component: Help00000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help10000',
        component: Help10000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help20000',
        component: Help20000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help30000',
        component: Help30000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help40000',
        component: Help40000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help50000',
        component: Help50000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help60000',
        component: Help60000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help70000',
        component: Help70000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help80000',
        component: Help80000Component,
        data: {
          title: 'overview'
        }
      },
      {
        path: 'help90000',
        component: Help90000Component,
        data: {
          title: 'overview'
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {}
