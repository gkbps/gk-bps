import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// import * as $ from 'jquery';

import { BodyBackgroundService } from '../../../nga/services/bodyBackground.service';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { SecurityService } from '../../../nga/services/security.service';
import { TcodeService } from '../../../nga/services/tcode.service';

/**
* @module IntroComponent
* Component for Intro page
* @function changeLanguage
* @function gotoLogin
*/
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

  ngOnInit() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.add('landing-body');
  }

  ngOnDestroy() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.remove('landing-body');
  }

  /**
  * @function changeLanguage
  * Change language of the page
  *
  * @param {string} lang
  */
  public changeLanguage(lang: string) {
    this.localStorageService.setLang(lang);
    this.translate.use(lang);
  }

  /**
  * @function gotoLogin
  * Goto Login page  
  */
  gotoLogin() {
    const securityService = this.securityService.getSavedSession();
    if (securityService) {
      this.tcodeService.executeTcode('lockscreen');
    } else {
      this.tcodeService.executeTcode('login');
    }
  }

}
