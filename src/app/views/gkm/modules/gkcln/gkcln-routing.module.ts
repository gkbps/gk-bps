// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../nga/services';

import { GkClnComponent } from './gkcln.component';

const routes: Routes = [
  {
    path: '',
    component: GkClnComponent,
    data: {
      title: 'gkcln'
    },
    children: [
      {
        path: '',
        redirectTo: 'gkcln00',
        pathMatch: 'full',
      },

      /**
			 * 0x
			 */
      { path: 'gkcln00', loadChildren: './components/gkcln00/gkcln00.module#GkCln00Module' },

			/**
      * 1x
      */
			{ path: 'gkcln1x', loadChildren: './components/gkcln1x/gkcln1x.module#GkCln1xModule' },
			{ path: 'gkcln10', loadChildren: './components/gkcln10/gkcln10.module#GkCln10Module' },
			{ path: 'gkcln11', loadChildren: './components/gkcln11/gkcln11.module#GkCln11Module' },
			{ path: 'gkcln12', loadChildren: './components/gkcln12/gkcln12.module#GkCln12Module' },
			{ path: 'gkcln13', loadChildren: './components/gkcln13/gkcln13.module#GkCln13Module' },
			{ path: 'gkcln14', loadChildren: './components/gkcln14/gkcln14.module#GkCln14Module' },
			{ path: 'gkcln15', loadChildren: './components/gkcln15/gkcln15.module#GkCln15Module' },
			{ path: 'gkcln16', loadChildren: './components/gkcln16/gkcln16.module#GkCln16Module' },
			{ path: 'gkcln17', loadChildren: './components/gkcln17/gkcln17.module#GkCln17Module' },
			{ path: 'gkcln18', loadChildren: './components/gkcln18/gkcln18.module#GkCln18Module' },
			{ path: 'gkcln19', loadChildren: './components/gkcln19/gkcln19.module#GkCln19Module' },

      /**
      * 2x
      */
			{ path: 'gkcln20', loadChildren: './components/gkcln20/gkcln20.module#GkCln20Module' },
			{ path: 'gkcln21', loadChildren: './components/gkcln21/gkcln21.module#GkCln21Module' },
			{ path: 'gkcln22', loadChildren: './components/gkcln22/gkcln22.module#GkCln22Module' },
			{ path: 'gkcln23', loadChildren: './components/gkcln23/gkcln23.module#GkCln23Module' },
			{ path: 'gkcln24', loadChildren: './components/gkcln24/gkcln24.module#GkCln24Module' },
			{ path: 'gkcln25', loadChildren: './components/gkcln25/gkcln25.module#GkCln25Module' },
			{ path: 'gkcln26', loadChildren: './components/gkcln26/gkcln26.module#GkCln26Module' },
			{ path: 'gkcln27', loadChildren: './components/gkcln27/gkcln27.module#GkCln27Module' },
			{ path: 'gkcln28', loadChildren: './components/gkcln28/gkcln28.module#GkCln28Module' },
			{ path: 'gkcln29', loadChildren: './components/gkcln29/gkcln29.module#GkCln29Module' },

      /**
			* 3x
			*/
      { path: 'gkcln3x', loadChildren: './components/gkcln3x/gkcln3x.module#GkCln3xModule' },
      { path: 'gkcln30', loadChildren: './components/gkcln30/gkcln30.module#GkCln30Module' },
      { path: 'gkcln31', loadChildren: './components/gkcln31/gkcln31.module#GkCln31Module' },
      { path: 'gkcln32', loadChildren: './components/gkcln32/gkcln32.module#GkCln32Module' },
      { path: 'gkcln33', loadChildren: './components/gkcln33/gkcln33.module#GkCln33Module' },
      { path: 'gkcln34', loadChildren: './components/gkcln34/gkcln34.module#GkCln34Module' },
      { path: 'gkcln35', loadChildren: './components/gkcln35/gkcln35.module#GkCln35Module' },
      { path: 'gkcln36', loadChildren: './components/gkcln36/gkcln36.module#GkCln36Module' },
      { path: 'gkcln37', loadChildren: './components/gkcln37/gkcln37.module#GkCln37Module' },
      { path: 'gkcln38', loadChildren: './components/gkcln38/gkcln38.module#GkCln38Module' },
      { path: 'gkcln39', loadChildren: './components/gkcln39/gkcln39.module#GkCln39Module' },

      /**
      * 4x
      */
			{ path: 'gkcln40', loadChildren: './components/gkcln40/gkcln40.module#GkCln40Module' },
			{ path: 'gkcln41', loadChildren: './components/gkcln41/gkcln41.module#GkCln41Module' },
			{ path: 'gkcln42', loadChildren: './components/gkcln42/gkcln42.module#GkCln42Module' },
			{ path: 'gkcln43', loadChildren: './components/gkcln43/gkcln43.module#GkCln43Module' },
			{ path: 'gkcln44', loadChildren: './components/gkcln44/gkcln44.module#GkCln44Module' },
			{ path: 'gkcln45', loadChildren: './components/gkcln45/gkcln45.module#GkCln45Module' },
			{ path: 'gkcln46', loadChildren: './components/gkcln46/gkcln46.module#GkCln46Module' },
			{ path: 'gkcln47', loadChildren: './components/gkcln47/gkcln47.module#GkCln47Module' },
			{ path: 'gkcln48', loadChildren: './components/gkcln48/gkcln48.module#GkCln48Module' },
			{ path: 'gkcln49', loadChildren: './components/gkcln49/gkcln49.module#GkCln49Module' },

      /**
      * 5x
      */
			{ path: 'gkcln50', loadChildren: './components/gkcln50/gkcln50.module#GkCln50Module' },
			{ path: 'gkcln51', loadChildren: './components/gkcln51/gkcln51.module#GkCln51Module' },
			{ path: 'gkcln52', loadChildren: './components/gkcln52/gkcln52.module#GkCln52Module' },
			{ path: 'gkcln53', loadChildren: './components/gkcln53/gkcln53.module#GkCln53Module' },
			{ path: 'gkcln54', loadChildren: './components/gkcln54/gkcln54.module#GkCln54Module' },
			{ path: 'gkcln55', loadChildren: './components/gkcln55/gkcln55.module#GkCln55Module' },
			{ path: 'gkcln56', loadChildren: './components/gkcln56/gkcln56.module#GkCln56Module' },
			{ path: 'gkcln57', loadChildren: './components/gkcln57/gkcln57.module#GkCln57Module' },
			{ path: 'gkcln58', loadChildren: './components/gkcln58/gkcln58.module#GkCln58Module' },
			{ path: 'gkcln59', loadChildren: './components/gkcln59/gkcln59.module#GkCln59Module' },
			{ path: 'gkcln5x', loadChildren: './components/gkcln5x/gkcln5x.module#GkCln5xModule' },

			/**
			* 6x
			*/
      { path: 'gkcln60', loadChildren: './components/gkcln60/gkcln60.module#GkCln60Module' },
      { path: 'gkcln61', loadChildren: './components/gkcln61/gkcln61.module#GkCln61Module' },
      { path: 'gkcln62', loadChildren: './components/gkcln62/gkcln62.module#GkCln62Module' },
      { path: 'gkcln63', loadChildren: './components/gkcln63/gkcln63.module#GkCln63Module' },
      { path: 'gkcln64', loadChildren: './components/gkcln64/gkcln64.module#GkCln64Module' },
      { path: 'gkcln65', loadChildren: './components/gkcln65/gkcln65.module#GkCln65Module' },
      { path: 'gkcln66', loadChildren: './components/gkcln66/gkcln66.module#GkCln66Module' },
      { path: 'gkcln67', loadChildren: './components/gkcln67/gkcln67.module#GkCln67Module' },
      { path: 'gkcln68', loadChildren: './components/gkcln68/gkcln68.module#GkCln68Module' },
      { path: 'gkcln69', loadChildren: './components/gkcln69/gkcln69.module#GkCln69Module' },
      { path: 'gkcln6x', loadChildren: './components/gkcln6x/gkcln6x.module#GkCln6xModule' },

			/**
			* 7x
			*/
			{ path: 'gkcln70', loadChildren: './components/gkcln70/gkcln70.module#GkCln70Module' },
			{ path: 'gkcln71', loadChildren: './components/gkcln71/gkcln71.module#GkCln71Module' },
			{ path: 'gkcln72', loadChildren: './components/gkcln72/gkcln72.module#GkCln72Module' },
			{ path: 'gkcln73', loadChildren: './components/gkcln73/gkcln73.module#GkCln73Module' },
			{ path: 'gkcln74', loadChildren: './components/gkcln74/gkcln74.module#GkCln74Module' },
			{ path: 'gkcln75', loadChildren: './components/gkcln75/gkcln75.module#GkCln75Module' },
			{ path: 'gkcln76', loadChildren: './components/gkcln76/gkcln76.module#GkCln76Module' },
			{ path: 'gkcln77', loadChildren: './components/gkcln77/gkcln77.module#GkCln77Module' },
			{ path: 'gkcln78', loadChildren: './components/gkcln78/gkcln78.module#GkCln78Module' },
			{ path: 'gkcln79', loadChildren: './components/gkcln79/gkcln79.module#GkCln79Module' },
			{ path: 'gkcln7x', loadChildren: './components/gkcln7x/gkcln7x.module#GkCln7xModule' },

			/**
			* 8x
			*/
			{ path: 'gkcln80', loadChildren: './components/gkcln80/gkcln80.module#GkCln80Module' },
			{ path: 'gkcln81', loadChildren: './components/gkcln81/gkcln81.module#GkCln81Module' },
			{ path: 'gkcln82', loadChildren: './components/gkcln82/gkcln82.module#GkCln82Module' },
			{ path: 'gkcln83', loadChildren: './components/gkcln83/gkcln83.module#GkCln83Module' },
			{ path: 'gkcln84', loadChildren: './components/gkcln84/gkcln84.module#GkCln84Module' },
			{ path: 'gkcln85', loadChildren: './components/gkcln85/gkcln85.module#GkCln85Module' },
			{ path: 'gkcln86', loadChildren: './components/gkcln86/gkcln86.module#GkCln86Module' },
			{ path: 'gkcln87', loadChildren: './components/gkcln87/gkcln87.module#GkCln87Module' },
			{ path: 'gkcln88', loadChildren: './components/gkcln88/gkcln88.module#GkCln88Module' },
			{ path: 'gkcln89', loadChildren: './components/gkcln89/gkcln89.module#GkCln89Module' },
			{ path: 'gkcln8x', loadChildren: './components/gkcln8x/gkcln8x.module#GkCln8xModule' },

      /**
      * 9x
      */
			{ path: 'gkcln90', loadChildren: './components/gkcln90/gkcln90.module#GkCln90Module' },
			{ path: 'gkcln91', loadChildren: './components/gkcln91/gkcln91.module#GkCln91Module' },
			{ path: 'gkcln92', loadChildren: './components/gkcln92/gkcln92.module#GkCln92Module' },
			{ path: 'gkcln93', loadChildren: './components/gkcln93/gkcln93.module#GkCln93Module' },
			{ path: 'gkcln94', loadChildren: './components/gkcln94/gkcln94.module#GkCln94Module' },
			{ path: 'gkcln95', loadChildren: './components/gkcln95/gkcln95.module#GkCln95Module' },
			{ path: 'gkcln96', loadChildren: './components/gkcln96/gkcln96.module#GkCln96Module' },
			{ path: 'gkcln97', loadChildren: './components/gkcln97/gkcln97.module#GkCln97Module' },
			{ path: 'gkcln98', loadChildren: './components/gkcln98/gkcln98.module#GkCln98Module' },
			{ path: 'gkcln99', loadChildren: './components/gkcln99/gkcln99.module#GkCln99Module' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkClnRoutingModule {}
