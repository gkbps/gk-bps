import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  GkFullLayoutComponent,
  GkSimpleLayoutComponent,
} from './containers';

import { AuthGuard, TcodeGuard } from './nga/services';

export const routes: Routes = [
  {
    path: '',
    component: GkSimpleLayoutComponent,
    data: { title: 'Public' },
    children: [
      { path: '', redirectTo: 'intro',  pathMatch: 'full' },
      { path: '401', loadChildren: './views/common/401/401.module#P401Module' },
      { path: '403', loadChildren: './views/common/403/403.module#P403Module' },
      { path: '404', loadChildren: './views/common/404/404.module#P404Module' },
      { path: '500', loadChildren: './views/common/500/500.module#P500Module' },
      { path: 'forgot', loadChildren: './views/common/forgot/forgot.module#ForgotModule' },
      { path: 'intro', loadChildren: './views/common/intro/intro.module#IntroModule' },
      { path: 'lockscreen', loadChildren: './views/common/lockscreen/lockscreen.module#LockscreenModule' },
      { path: 'login', loadChildren: './views/common/login/login.module#LoginModule' },
      { path: 'register', loadChildren: './views/common/register/register.module#RegisterModule' },
    ]
  },
  {
    path: '', component: GkFullLayoutComponent, canActivateChild: [AuthGuard],
    data: { title: '' },
    children: [
      { path: 'chat', loadChildren: './views/common/chat/chat.module#ChatModule' },
      { path: 'dict', loadChildren: './views/common/dict/dict.module#DictModule' },
      { path: 'fav', loadChildren: './views/common/fav/fav.module#FavModule' },
      { path: 'terminal', loadChildren: './views/common/gkTerminal/gkTerminal.module#GkTerminalModule' },
      { path: 'mine', loadChildren: './views/common/mine/mine.module#MineModule' },
      { path: 'news', loadChildren: './views/common/news/news.module#NewsModule' },
      { path: 'policy', loadChildren: './views/common/policy/policy.module#PolicyModule' },
      { path: 'profile', loadChildren: './views/common/profile/profile.module#ProfileModule' },
      { path: 'setting', loadChildren: './views/common/setting/setting.module#SettingModule' },
      { path: 'tray', loadChildren: './views/common/tray/tray.module#TrayModule' },

      { path: 'help', loadChildren: './views/help/help.module#HelpModule' },
      { path: 'home', loadChildren: './views/home/home.module#HomeModule' },
      { path: 'about', loadChildren: './views/common/about/about.module#AboutModule' },
      { path: 'main', loadChildren: './views/main/main.module#MainModule' },
    ]
  },
  {
    path: '', component: GkFullLayoutComponent, canActivateChild: [AuthGuard],
    data: { title: '' },
    children: [
      { path: 'gkm', loadChildren: './views/gkm/gkm.module#GkmModule' },
      { path: 'gkcln', loadChildren: './views/gkm/modules/gkcln/gkcln.module#GkClnModule' },
      { path: 'gksol', loadChildren: './views/gkm/modules/gksol/gksol.module#GkSolModule' },
      { path: 'gktcd', loadChildren: './views/gkm/modules/gktcd/gktcd.module#GkTcdModule' },
    ]
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
