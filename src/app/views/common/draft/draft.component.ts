import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/api';

import { Store } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { TrayBaseComponent } from '../../base/tray/tray.component';

/**
* @module DraftComponent
* Component for Request in Draft
*/
@Component({
  templateUrl: '../../base/tray/tray.component.html',
  styleUrls: ['./draft.scss']
})
export class DraftComponent extends TrayBaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  trayType = 'draft';

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    public store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService, store);
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
