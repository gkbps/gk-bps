import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

/**/
import { Store, select } from '@ngrx/store';
import { getNotificationAction } from '../../../ngrx/notification/notifications.actions';
/**/

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  FileService
} from '../../../nga/services';
import { BaseComponent } from '../../base';

@Component({
  selector: 'download',
  templateUrl: 'download.component.html',
  styleUrls: ['download.scss']
})
export class DownloadComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'download';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  tcode = 'download';
  id: string;

  notificationStore: any;
  notification: any;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private activatedRoute: ActivatedRoute,
    private security: SecurityService,
    private fileService: FileService,
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    this.notificationStore = store.pipe(select('notification'));
    this.notificationStore.subscribe(data => {
      this.notification = data;
      console.log(this.notification);
    });
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'policy');

    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        if (this.id) {
          this.store.dispatch(getNotificationAction(this.id));
        }
      });
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

  downloadFile() {
    console.log('DownloadFile')!
    this.fileService.downloadFileByFileName(this.notification.data.url);
  }

}