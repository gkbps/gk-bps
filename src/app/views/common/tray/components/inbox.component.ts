import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService,
} from '../../../../nga/services';
import { GkRequestService } from '../../../../store/_services/gkRequest.service';
import { TrayBaseComponent } from '../../../base';

@Component({
  templateUrl: '../../../base/trayBase/trayBase.component.html'
})
export class InboxComponent extends TrayBaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  // Derive class properties

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    public securityService: SecurityService,
    public tcodeService: TcodeService,
    public gkRequestService: GkRequestService,
  ){
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService, securityService, tcodeService, gkRequestService);

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    this.trayType = 'inbox';
    super.ngOnInit();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
