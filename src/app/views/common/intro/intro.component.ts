import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as $ from 'jquery';

import {
  LocalStorageService,
  BodyBackgroundService,
  SecurityService,
  TcodeService,
} from '../../../nga/services';
// import { GlobalState } from '../../../global.state';

@Component({
  templateUrl: 'intro.html',
  styleUrls: [
    'intro.scss',
  ]
})
export class IntroComponent implements OnInit, OnDestroy {

  constructor(
    private localStorageService: LocalStorageService,
    private bodyBackgroundService: BodyBackgroundService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private translate: TranslateService,
    // private globalState: GlobalState,
  ) {
    bodyBackgroundService.clearBodyBackground();
    // globalState.unsubscribeAll();
  }

  public changeLanguage(lang: string) {
    this.localStorageService.setLang(lang);
    this.translate.use(lang);
  }

  ngOnInit() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.add('landing-body');
  }

  gotoLogin() {
    const securityService = this.securityService.getSavedSession();
    if (securityService) {
      this.tcodeService.executeTcode('lockscreen');
    } else {
      this.tcodeService.executeTcode('login');
    }
  }

  ngOnDestroy() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.remove('landing-body');
  }

}
