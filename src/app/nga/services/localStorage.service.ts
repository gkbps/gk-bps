import { Injectable } from '@angular/core';

import { UtilsService } from './utils.service';

@Injectable()
export class LocalStorageService {

  constructor(
    private utilsService: UtilsService
  ) { }

  /*****************************************************************************
   * TO UTILIZE LOCAL STORAGE
   * setLocalStorage
   * getLocalStorage
   * setWorkingLge
   * getWorkingLge
   * setWorkingEnv
   * getWorkingEnv
   *****************************************************************************/

  /* Customized localStorage */
  setLocalStorage(item: string, value: any) {
    localStorage.setItem(item, value);
  }

  getLocalStorage(item: string): any {
    return localStorage.getItem(item);
  }

  removeLocalStorage(item: string) {
    localStorage.removeItem(item);
  }

  /*****************************************************************************/

  /* Enviroment */
  setEnv(env: string = '') {
    if (env === '' ) {
      env = JSON.stringify({
        'wk': {
          'status': true,
          'lge': '',
          'year': new Date().getFullYear()
        },
        'pref': {
          'layout': 'moody',
          'theme': 'bluegrey',
          'dark': false,
          'wrapperStatic': true,
          'lang': 'en',
          'isFavTop': true,
          'navType': 'circle',
          'navEffect': 'effect1',
          'isSmall': false,
          'notificationMode': true,
          'isGrowl': true,
          'timeOut': 5000,
          'debug': false,
          'home': ''
        },
        'data_pref': {
          'rows': 10,
        }
      });
    }
    // console.log(env);
    localStorage.setItem('env', env);
  }

  getEnv(): any {
    const env = localStorage.getItem('env');
    if (env) {
      return JSON.parse(env);
    } else {
      this.setEnv(); // To avoid null value
      return JSON.parse(localStorage.getItem('env'));
    }
  }

  /*****************************************************************************/

  /* Working */
  setWkBar(wkBarStatus: boolean) {
    let env = this.getEnv();
    if (env.wk.status !== wkBarStatus) {
      env.wk.status = wkBarStatus;
      this.setEnv(JSON.stringify(env));
    }
  }

  getWkBar(): boolean {
    const env = this.getEnv();
    return (env.wk.status);
  }

  /* Working Legal Entity */
  setWkLge(lge: string) {
    const env = this.getEnv();
    const lcLge = lge.toLowerCase();
    if (env.wk.lge !== lcLge) {
      env.wk.lge = lcLge;
      this.setEnv(JSON.stringify(env));
    }
  }

  getWkLge(): string {
    const env = this.getEnv();
    return env.wk.lge;
  }

  /* Working Year */
  setWkYear(year: string) {
    const env = this.getEnv();
    if (env.wk.year !== year) {
      env.wk.year = year;
      this.setEnv(JSON.stringify(env));
    }
  }

  getWkYear(): string {
    const env = this.getEnv();
    return env.wk.year;
  }

  /*****************************************************************************/

  /* Layout */
  setLayout(layout: string = 'moody') {
    let env = this.getEnv();
    if (env.pref.layout !== layout) {
      env.pref.layout = layout;
      this.setEnv(JSON.stringify(env));
    }
  }

  getLayout(): string {
    const env = this.getEnv();
    return (env.pref.layout);
  }

  /* Theme */
  setTheme(theme: string = 'bluegrey') {
    let env = this.getEnv();
    if (env.pref.theme !== theme) {
      env.pref.theme = theme;
      this.setEnv(JSON.stringify(env));
    }
  }

  getTheme(): string {
    const env = this.getEnv();
    return (env.pref.theme);
  }

  /* Dark */
  setDark(dark: boolean = false) {
    let env = this.getEnv();
    if (env.pref.dark !== dark) {
      env.pref.dark = dark;
      this.setEnv(JSON.stringify(env));
    }
  }

  getDark(): boolean {
    const env = this.getEnv();
    return (env.pref.dark);
  }

  /* Wrapper Static State */
  setWrapperStatic(value) {
    const env = this.getEnv();
    if (env.pref.wrapperStatic !== value) {
      env.pref.wrapperStatic = value;
      this.setEnv(JSON.stringify(env));
    }
  }

  getWrapperStatic() {
    const env = this.getEnv();
    return env.pref.wrapperStatic;
  }

  /* Language */
  setLang(lang: string = 'en') {
    let env = this.getEnv();
    if (env.pref.lang !== lang) {
      env.pref.lang = lang;
      this.setEnv(JSON.stringify(env));
    }
  }

  getLang(): string {
    const env = this.getEnv();
    return (env.pref.lang);
  }

  /* Nav Type */
  setNavType(navType: string = 'circle') {
    let env = this.getEnv();
    if (env.pref.navType !== navType) {
      env.pref.navType = navType;
      this.setEnv(JSON.stringify(env));
    }
  }

  getNavType(): string {
    const env = this.getEnv();
    return (env.pref.navType);
  }

  /* Nav Effect */
  setNavEffect(navEffect: string = 'effect1') {
    let env = this.getEnv();
    if (env.pref.navEffect !== navEffect) {
      env.pref.navEffect = navEffect;
      this.setEnv(JSON.stringify(env));
    }
  }

  getNavEffect(): string {
    const env = this.getEnv();
    return (env.pref.navEffect);
  }

  /* Navigation Size */
  setNavSize(isSmall: boolean = false) {
    let env = this.getEnv();
    if (env.pref.isSmall !== isSmall) {
      env.pref.isSmall = isSmall;
      this.setEnv(JSON.stringify(env));
    }
  }

  getNavSize(): boolean {
    const env = this.getEnv();
    return (env.pref.isSmall);
  }

  /* Notification Mode */
  setNotificationMode(notificationMode: boolean = false) {
    const env = this.getEnv();
    console.log(notificationMode);
    if (env.pref.notificationMode !== notificationMode) {
      env.pref.notificationMode = notificationMode;
      this.setEnv(JSON.stringify(env));
    }
  }

  getNotificationMode() {
    const env = this.getEnv();
    return (env.pref.notificationMode);
  }

  /* Notification Type */
  setNotificationType(isGrowl: boolean = true) {
    let env = this.getEnv();
    env.pref.isGrowl = isGrowl;
    this.setEnv(JSON.stringify(env));
  }

  getNotificationType(): boolean {
    const env = this.getEnv();
    return (env.pref.isGrowl);
  }

  /* Notification Type */
  setTimeOut(timeOut = 5000) {
    let env = this.getEnv();
    env.pref.timeOut = timeOut;
    this.setEnv(JSON.stringify(env));
  }

  getTimeOut(): number {
    const env = this.getEnv();
    return (env.pref.timeOut);
  }

  /* Debug Mode */
  setDebugMode(debugMode: boolean = false) {
    const env = this.getEnv();
    if (env.pref.debug !== debugMode) {
      env.pref.debug = debugMode;
      this.setEnv(JSON.stringify(env));
    }
  }

  getDebugMode() {
    const env = this.getEnv();
    return (env.pref.debug);
  }
  /*****************************************************************************/

  /* Error */
  clearError() {
    localStorage.setItem('errorHistory', '[]');
  }

  pushError(error) {
    if (localStorage.getItem('errorHistory') === null) {
      localStorage.setItem('errorHistory', '[]');
    }
    const errorHistory: any[] = JSON.parse(localStorage.getItem('errorHistory'));
    while (errorHistory.length >= 10 ) {
      errorHistory.shift();
    }
    errorHistory.push(error);
    localStorage.setItem('errorHistory', JSON.stringify(errorHistory));
  }

  getErrors(last: boolean): string {
    const errors = JSON.parse(localStorage.getItem('errorHistory'));
    if (last) {
      return JSON.stringify(errors[errors.length - 1]);
    } else {
      return JSON.stringify(errors);
    }
  }

  /*****************************************************************************/

  /* Fav */
  setFav(fav: any = []) {
    localStorage.setItem('fav', JSON.stringify(fav));
  }

  getFav() {
    const fav = localStorage.getItem('fav');
    if (fav && this.utilsService.isJsonString(fav)) {
      return JSON.parse(fav);
    } else {
      const initialFav = [
        {
          data: {
            label: 'myFavourites',
            icon: 'favorite_border',
            type: 'section'
          },
          children: []
        }
      ];
      this.setFav(initialFav); // To avoid null value
      return initialFav;
    }
  }

  /* Fav Position */
  setFavPosition(isFavTop: boolean = true) {
    const env = this.getEnv();
    if (env.pref.isFavTop !== isFavTop) {
      env.pref.isFavTop = isFavTop;
      this.setEnv(JSON.stringify(env));
    }
  }

  getFavPosition() {
    const env = this.getEnv();
    return (env.pref.isFavTop);
  }

  /* Fav Position */
  setRows(rows: number = 10) {
    const env = this.getEnv();
    if (env.data_pref.rows !== rows) {
      env.data_pref.rows = rows;
      this.setEnv(JSON.stringify(env));
    }
  }

  getRows() {
    const env = this.getEnv();
    return (env.data_pref.rows);
  }
  /*****************************************************************************/

  /* chatRoom */
  setChatRoom(chatRoom: any = [{ data: { 'rid': 'about' } }]) {
    localStorage.setItem('chatRoom', JSON.stringify(chatRoom));
  }

  getChatRoom() {
    const chatRoom = localStorage.getItem('chatRoom');
    if (chatRoom && this.utilsService.isJsonString(chatRoom)) {
      return JSON.parse(chatRoom);
    } else {
      const initialChatRoom = [{ data: { 'rid': 'about' } }];
      this.setFav(initialChatRoom); // To avoid null value
      return initialChatRoom;
    }
  }

}
