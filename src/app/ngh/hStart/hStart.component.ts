import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../global.state';
import {
  LocalStorageService,
  SecurityService,
  TcodeService,
  NavigationService,
} from '../../nga/services';

@Component({
  selector: 'h-start',
  templateUrl: './hStart.html',
  styleUrls: ['hStart.scss']
})
export class HStartComponent implements OnInit, OnDestroy {

  myScope = 'h-start';

  @Input() header = 'Hellow';
  @Input() image = '';

  constructor(
    private translate: TranslateService,

    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit () {
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
