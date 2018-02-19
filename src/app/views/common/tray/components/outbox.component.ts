import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/api';

import { Store } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService
} from '../../../../nga/services';
import { TrayBaseComponent } from '../../../base/tray/tray.component';

@Component({
  templateUrl: '../../../base/tray/tray.component.html',
  // styleUrls:['./outbox.scss']
})
export class OutboxComponent extends TrayBaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  trayType = 'outbox';

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,
    public store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService, store);
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();
  }

}
