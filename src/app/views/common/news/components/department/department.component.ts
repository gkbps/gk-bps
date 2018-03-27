// External
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

// Internal
import { GlobalState } from '../../../../../global.state';
import {
  SecurityService,
  TcodeService,
  NavigationService,
  LocalStorageService,
 } from '../../../../../nga/services';

@Component({
  selector: 'news-dept',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})

export class NewsDeptComponent implements OnInit, OnDestroy {

  myScope = 'department';

  constructor(
    private router: Router,

    private globalState: GlobalState,
    private localStorage: LocalStorageService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() {
    this.navigationService.trackHistory();
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    // Register Language Callback in Global Status
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
