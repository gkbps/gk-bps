import { Injectable } from '@angular/core';

import { UtilsService } from './utils.service';

/**
* @module LocalStorageService
* Service to provide helpers for dealing with local storage
*
* @function setLocalStorage
* @function getLocalStorage
* @function removeLocalStorage
*
* @function setEnv
* @function getEnv
*
* @function setWorkingLge
* @function getWorkingLge
*
* @function setWkLge
* @function getWkLge
*
* @function setWkYear
* @function getWkYear
*
* @function getSetting
*
* @function setLayout
* @function getLayout
*
* @function setTheme
* @function getTheme
*
* @function setDark
* @function getDark
*
* @function setWrapperStatic
* @function getWrapperStatic
*
* @function setLang
* @function getLang
*
* @function setNavType
* @function getNavType
*
* @function setNavEffect
* @function getNavEffect
*
* @function setNotificationMode
* @function getNotificationMode
*
* TODO: To eliminate
* @function setNotificationType
* @function getNotificationType
*
* @function setToastyTimeOut
* @function getToastyTimeOut
*
* @function setToastyTheme
* @function getToastyTheme
*
* @function setToastyPosition
* @function getToastyPosition
*
* @function setDebugMode
* @function getDebugMode
*
* @function clearError
* @function pushError
* @function getErrors
*
* @function setFav
* @function getFav
*
* @function setFavPosition
* @function getFavPosition
*
* @function setRows
* @function getRows
*
* @function setChatRoom
* @function getChatRoom
*/
@Injectable()
export class LocalStorageService {

  constructor(
    private utilsService: UtilsService
  ) { }

  /*****************************************************************************/

  /**
  * @function setLocalStorage
  * Set an item in local storage with assigned value
  *
  * @param {string} item
  * @param {any} value
  */
  setLocalStorage(item: string, value: any) {
    localStorage.setItem(item, value);
  }

  /**
  * @function getLocalStorage
  * Get value of an item in local storage
  *
  * @param {string} item
  *
  * @return {any}
  */
  getLocalStorage(item: string): any {
    return localStorage.getItem(item);
  }

  /**
  * @function removeLocalStorage
  * Remove an item in local storage
  *
  * @param {string} item
  */
  removeLocalStorage(item: string) {
    localStorage.removeItem(item);
  }

  /*****************************************************************************/

  /**
  * @function setEnv
  * Set or update (env) item in local storage, if no input then set initial
  *
  * @param {string} env
  */
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
          'toastyTheme': 'default',
          'toastyTimeOut': 5000,
          'toastyPosition': 'bottom-right',
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

  /**
  * @function getEnv
  * Get value of (env) item in local storage, if no value then set/ return initial
  *
  * @param {string} env
  *
  * @return {any}
  */
  getEnv(): any {
    const env = localStorage.getItem('env');
    if (env) {
      return JSON.parse(env);
    } else {
      this.setEnv(); // To avoid null value
      return JSON.parse(localStorage.getItem('env'));
    }
  }

  /**
  * @function setWkBar
  * Set or update working bar status in (env)
  *
  * @param wkBarStatus
  */
  setWkBar(wkBarStatus: boolean) {
    const env = this.getEnv();
    if (env.wk.status !== wkBarStatus) {
      env.wk.status = wkBarStatus;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getWkBar
  * Get working bar status in (env)
  */
  getWkBar(): boolean {
    const env = this.getEnv();
    return (env.wk.status);
  }

  /**
  * @function setWkLge
  * Set or update working legal entity in in (env)
  *
  * @param lge
  */
  setWkLge(lge: string) {
    const env = this.getEnv();
    const lcLge = lge.toLowerCase();
    if (env.wk.lge !== lcLge) {
      env.wk.lge = lcLge;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getWkLge
  * Get working legal entiry in (env)
  */
  getWkLge(): string {
    const env = this.getEnv();
    return env.wk.lge;
  }

  /**
  * @function setWkYear
  * Set or update working year in (env)
  *
  * @param year
  */
  setWkYear(year: string) {
    const env = this.getEnv();
    if (env.wk.year !== year) {
      env.wk.year = year;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getWkYear
  * Get working year in (env)
  */
  getWkYear(): string {
    const env = this.getEnv();
    return env.wk.year;
  }

  /*****************************************************************************/

  /**
  * @function getSetting
  *
  */
  getSetting() {
    const savedSession = JSON.parse(this.getLocalStorage('savedSession'));
    console.log(savedSession.setting);
    return (savedSession.setting);
  }

  /*****************************************************************************/

  /**
  * @function setLayout
  * Set or update layout for the App
  *
  * @param {string} layout
  */
  setLayout(layout: string = 'moody') {
    const env = this.getEnv();
    if (env.pref.layout !== layout) {
      env.pref.layout = layout;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getLayout
  * Get layout of the App
  */
  getLayout(): string {
    const env = this.getEnv();
    return (env.pref.layout);
  }

  /**
  * @function setTheme
  * Set or update Theme for the App
  *
  * @param {string} theme
  */
  setTheme(theme: string = 'bluegrey') {
    const env = this.getEnv();
    if (env.pref.theme !== theme) {
      env.pref.theme = theme;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getTheme
  * Get Theme of the App
  */
  getTheme(): string {
    const env = this.getEnv();
    return (env.pref.theme);
  }

  /**
  * @function setDark
  * Set or update Dark status for the App
  *
  * @param {boolean} dark
  */
  setDark(dark: boolean = false) {
    const env = this.getEnv();
    if (env.pref.dark !== dark) {
      env.pref.dark = dark;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getDark
  * Get Dark status of the App
  */
  getDark(): boolean {
    const env = this.getEnv();
    return (env.pref.dark);
  }

  /**
  * @function setWrapperStatic
  * Set or update Wrapper Static State for the App
  *
  * @param {string} value
  */
  setWrapperStatic(value) {
    const env = this.getEnv();
    if (env.pref.wrapperStatic !== value) {
      env.pref.wrapperStatic = value;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getWrapperStatic
  * Get Wrapper Static State for the App
  */
  getWrapperStatic() {
    const env = this.getEnv();
    return env.pref.wrapperStatic;
  }

  /**
  * @function setLang
  * Set or update language for the App
  *
  * @param {string} lang
  */
  setLang(lang: string = 'en') {
    const env = this.getEnv();
    if (env.pref.lang !== lang) {
      env.pref.lang = lang;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getLang
  * Get language of the App
  */
  getLang(): string {
    const env = this.getEnv();
    return (env.pref.lang);
  }

  /**
  * @function setNavType
  * Set or update Navigation Icon Type of Navigation Page
  *
  * @param navType
  */
  setNavType(navType: string = 'circle') {
    const env = this.getEnv();
    if (env.pref.navType !== navType) {
      env.pref.navType = navType;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getNavType
  * Get Navigation Icon Type of Navigation Page
  */
  getNavType(): string {
    const env = this.getEnv();
    return (env.pref.navType);
  }

  /**
  * @function setNavEffect
  * Set or update Navigation Effect of Navigation Page
  *
  * @param navEffect
  */
  setNavEffect(navEffect: string = 'effect1') {
    const env = this.getEnv();
    if (env.pref.navEffect !== navEffect) {
      env.pref.navEffect = navEffect;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getNavEffect
  * Get Navigation Effect of Navigation Page
  */
  getNavEffect(): string {
    const env = this.getEnv();
    return (env.pref.navEffect);
  }

  /**
  * @function setNavSize
  * Set or update Navigation Size of Navigation Page
  *
  * @param isSmall
  */
  setNavSize(isSmall: boolean = false) {
    const env = this.getEnv();
    if (env.pref.isSmall !== isSmall) {
      env.pref.isSmall = isSmall;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getNavSize
  * Get Navigation Size of Navigation Page
  */
  getNavSize(): boolean {
    const env = this.getEnv();
    return (env.pref.isSmall);
  }

  /**
  * @function setNotificationMode
  * Set or update Notification Mode of the App
  *
  * @param notificationMode
  */
  setNotificationMode(notificationMode: boolean = false) {
    const env = this.getEnv();
    console.log(notificationMode);
    if (env.pref.notificationMode !== notificationMode) {
      env.pref.notificationMode = notificationMode;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getNotificationMode
  * Get Notification Mode of the App
  */
  getNotificationMode() {
    const env = this.getEnv();
    return (env.pref.notificationMode);
  }

  /**
  * @function setNotificationType
  * Set or update Notification Type of the App
  *
  * @param isGrowl
  */
  setNotificationType(isGrowl: boolean = true) {
    const env = this.getEnv();
    env.pref.isGrowl = isGrowl;
    this.setEnv(JSON.stringify(env));
  }

  /**
  * @function getNotificationType
  * Get Notification Type of the App
  */
  getNotificationType(): boolean {
    const env = this.getEnv();
    return (env.pref.isGrowl);
  }

  /**
  * @function setToastyTimeOut
  * Set or update timeout for Toasty
  *
  * @param timeOut
  */
  setToastyTimeOut(timeOut = 5000) {
    const env = this.getEnv();
    if (env.pref.toastyTimeOut !== timeOut) {
      env.pref.toastyTimeOut = timeOut;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getToastyTimeOut
  * Get timeout of Toasty
  */
  getToastyTimeOut(): number {
    const env = this.getEnv();
    return (env.pref.toastyTimeOut);
  }

  /**
  * @function setToastyTheme
  * Set or update theme for Toasty
  *
  * @param theme
  */
  setToastyTheme(theme = 'default') {
    const env = this.getEnv();
    if (env.pref.toastyTheme !== theme) {
      env.pref.toastyTheme = theme;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getToastyTheme
  * Get theme of Toasty
  */
  getToastyTheme(): string {
    const env = this.getEnv();
    return (env.pref.toastyTheme);
  }

  /**
  * @function setToastyPosition
  * Set or update position for Toasty
  *
  * @param position
  */
  setToastyPosition(position = 'bottom-right') {
    const env = this.getEnv();
    if (env.pref.toastyPosition !== position) {
      env.pref.toastyPosition = position;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getToastyPosition
  * Get position of Toasty
  */
  getToastyPosition(): string {
    const env = this.getEnv();
    return (env.pref.toastyPosition);
  }

  /**
  * @function setDebugMode
  * Set or update mode of Debug
  *
  * @param debugMode
  */
  setDebugMode(debugMode: boolean = false) {
    const env = this.getEnv();
    if (env.pref.debug !== debugMode) {
      env.pref.debug = debugMode;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getDebugMode
  * Get mode of Debug
  */
  getDebugMode() {
    const env = this.getEnv();
    return (env.pref.debug);
  }
  /*****************************************************************************/

  /**
  * @function clearError
  * Clear all error history
  */
  clearError() {
    localStorage.setItem('errorHistory', '[]');
  }

  /**
  * @function pushError
  * Push new error in the array of errors stored in local storage
  *
  * @param error
  */
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

  /**
  * @function getErrors
  * Get the last item or whole array of errors stored in local storage
  *
  * @param {boolean} last
  */
  getErrors(last: boolean): string {
    const errors = JSON.parse(localStorage.getItem('errorHistory'));
    if (last) {
      return JSON.stringify(errors[errors.length - 1]);
    } else {
      return JSON.stringify(errors);
    }
  }

  /*****************************************************************************/

  /**
  * @function setFav
  * Set or update favorite into local storage
  *
  * @param fav
  */
  setFav(fav: any = []) {
    localStorage.setItem('fav', JSON.stringify(fav));
  }

  /**
  * @function getFav
  * Get favorite from local storage
  */
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

  /**
  * @function setFavPosition
  * Set or update favorite position in the sidebar menu
  *
  * @param isFavTop
  */
  setFavPosition(isFavTop: boolean = true) {
    const env = this.getEnv();
    if (env.pref.isFavTop !== isFavTop) {
      env.pref.isFavTop = isFavTop;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getFavPosition
  * Get favorite position in the sidebar menu
  */
  getFavPosition() {
    const env = this.getEnv();
    return (env.pref.isFavTop);
  }

  /**
  * @function setRows
  * Set or update rows in the master list
  *
  * @param {number} rows
  */
  setRows(rows: number = 10) {
    const env = this.getEnv();
    if (env.data_pref.rows !== rows) {
      env.data_pref.rows = rows;
      this.setEnv(JSON.stringify(env));
    }
  }

  /**
  * @function getRows
  * Get rows to be displayed in master list
  */
  getRows() {
    const env = this.getEnv();
    return (env.data_pref.rows);
  }
  /*****************************************************************************/

  /**
  * @function setChatRoom
  * Set or update the list of chat room available to logged in user
  *
  * @param chatRoom
  */
  setChatRoom(chatRoom: any = [{ data: { 'rid': 'about' } }]) {
    localStorage.setItem('chatRoom', JSON.stringify(chatRoom));
  }

  /**
  * @function getChatRoom
  * Get the list of chat room available to logged in user
  */
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
