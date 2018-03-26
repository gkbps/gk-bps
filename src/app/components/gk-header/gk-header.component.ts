import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import {
  getTopNotificationsAction,
} from '../../ngrx/notification/notifications.actions';

// GK - Alphabet
import { AppConfig } from '../../app.config';
import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../nga/services/localStorage.service';
import { NavigationService } from '../../nga/services/navigation.service';
import { SecurityService } from '../../nga/services/security.service';
import { TcodeService } from '../../nga/services';

/**
* @module GkHeaderComponent
* Header of the App, serves as placeholder for:
* - Sidebar toggle button
* - User avatar / dropdown menu
* - Transaction command
* - Notification list
* - Message list
* - Language
* - Current woking bar toggle button
*
* @param myScope
* @param fullname, @param username, @param avatar
* @param tcodeExecution
* @param notification, @param notificationCount, @param notificationsList
* @param message, @param messageCount, @param messagesList
* @param lang
* @param currentWkBarStatus
*
* @function keyDownFunction
* @function openNotification
* @function openMessage
* @function changeLanguage
* @function toggleWkBar
* @function gotoTcode
*/
@Component({
  selector: 'gk-header',
  templateUrl: './gk-header.component.html',
  styleUrls: ['./fixed.scss']
})
export class GkHeaderComponent implements OnInit, OnDestroy {
  myScope = 'gk-header';

  fullname;
  username;
  avatar;

  public form: FormGroup;
  public tcodeExecution = '';

  notification: any;
  notificationCount = 0;
  notificationsList = [];

  message: any;
  messageCount = 0;
  messagesList = [];

  lang;
  currentWkBarStatus;

  constructor(
    private router: Router,

    private translate: TranslateService,

    // GK - Alphabet
    private appConfig: AppConfig,
    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,

    private store: Store<any>
  ) {
    this.subscribeLocalState();

    this.notification = this.store.pipe(select('top_notifications'));
    this.notification.subscribe(res => {
      this.notificationCount = res.data.total || 0;
      this.notificationsList = res.data.data || [];
    })
    this.store.dispatch(getTopNotificationsAction('', '{"created_at": -1}', 0, 5));

    // Init user's preference
    this.lang = localStorageService.getLang();
    this.globalState.notifyMyDataChanged('language', '', this.lang);

    this.currentWkBarStatus = localStorageService.getWkBar();
    this.globalState.notifyMyDataChanged('wkBarStatus', '', this.currentWkBarStatus);
  }

  ngOnInit(): void {
    const user = this.securityService.getCurrentUser();
    this.fullname = user.firstName + ' ' + user.lastName;
    this.username = user.username;

    const rootPath = this.appConfig.apiUrl;
    this.avatar = rootPath + '/repo/' + this.securityService.getToken() + '/users/' + user.avatar;
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.lang = lang;
      this.translate.use(this.lang);
      this.localStorageService.setLang(lang);
    });

    this.globalState.subscribeEvent('wkBarStatus', this.myScope, (wkBarStatus) => {
      this.currentWkBarStatus = wkBarStatus;
      this.localStorageService.setWkBar(wkBarStatus);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.globalState.unsubscribeEvent('wkBarStatus', this.myScope);
  }

  /* LOCAL OPERATION */

  public keyDownFunction(event) {
    if ((event.keyCode === 13) && (this.tcodeExecution.trim())) {
      const url: string = this.tcodeService.urlLead(this.tcodeExecution);
      this.tcodeExecution = '';
      this.router.navigate([url]);
    }
  }

  openNotification(item) {
    // console.log(item);
    const target = item.id ? item.id : item._id;
    this.tcodeService.executeTcode(item.tcode, target);
    return false; // prevent a href automatically link
  }

  openMessage(item) {
    // console.log(item);
    // const target = item.id ? item.id : item._id;
    // this.tcodeService.executeTcode(item.tcode, target);
    return false; // prevent a href automatically link
  }

  public changeLanguage(lang: string) {
    this.globalState.notifyMyDataChanged('language', '', lang);
    return false; // prevent a href automatically link
  }

  public toggleWkBar() {
    this.globalState.notifyMyDataChanged('wkBarStatus', '', !this.currentWkBarStatus);
    return false; // prevent a href automatically link
  }

  gotoTcode(tcode) {
    this.tcodeService.executeTcode(tcode);
    return false; // prevent a href automatically link
  }

  public logOut() {
    this.navigationService.gotoIntro();
  }

}
