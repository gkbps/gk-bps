import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AppConfig } from '../../app.config';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import {
  NavigationService,
  LocalStorageService,
  SecurityService,
  TcodeService,
} from '../../nga/services';

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
  lang;
  currentWkBarStatus;

  public form: FormGroup;
  public tcodeExecution = '';

  constructor(
    private router: Router,
    private translate: TranslateService,

    private config: AppConfig,
    private globalState: GlobalState,
    private navigationService: NavigationService,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    this.subscribeLocalState();

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

    const rootPath = this.config.apiUrl;
    this.avatar = rootPath + '/repo/' + this.securityService.getToken() + '/users/' + user.avatar;
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.lang = lang;
      this.translate.use(this.lang);
      this.localStorageService.setLang(lang);
    });

    this.globalState.subscribeEvent('wkBarStatus', this.myScope, (wkBarStatus) => {
      // console.log(wkBarStatus);
      this.currentWkBarStatus = wkBarStatus;
      this.localStorageService.setWkBar(wkBarStatus);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.globalState.unsubscribeEvent('wkBarStatus', this.myScope);
  }

  public keyDownFunction(event) {
    if ((event.keyCode === 13) && (this.tcodeExecution.trim())) {
      const url: string = this.tcodeService.urlLead(this.tcodeExecution);
      // console.log(url);
      this.tcodeExecution = '';
      this.router.navigate([url]);
    }
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
    this.tcodeService.executeTCode(tcode);
    return false; // prevent a href automatically link
  }

  public logOut() {
    this.navigationService.gotoIntro();
  }
  
}
