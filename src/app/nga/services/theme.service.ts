import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from './localStorage.service';

/**
* @module ThemeService
* Service to manipulate App layout and theme
*
* @function changeLayout
* @function getLayout
*
* @function changeTheme
* @function getTheme
*
* @function changeStylesheet
*/
@Injectable()
export class ThemeService {

  private layout = new Subject<any>();
  private theme = new Subject<any>();

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  /**
  * @function changeLayout
  * Change layout of the App
  *
  * @param {string} layout
  */
  changeLayout(layout: string) {
    const url = './assets/layout/css/layout-' + layout + '.css';
    document.getElementById('layout-css').setAttribute('href', url);
    this.localStorageService.setLayout(layout);
  }

  /**
  * @function getLayout
  * Get layout of the App
  *
  * @return {string}
  */
  getLayout(): Observable<any> {
    return this.layout.asObservable();
  }

  /**
  * @function changeTheme
  * Change theme of the App
  *
  * @param {string} theme
  */
  changeTheme(theme: string) {
    const url = './assets/theme/theme-' + theme + '.css';
    document.getElementById('theme-css').setAttribute('href', url);
    this.localStorageService.setTheme(theme);
  }

  /**
  * @function getTheme
  * Get theme of the App
  *
  * @return {string}
  */
  getTheme():  Observable<any> {
    return this.theme.asObservable();
  }

  /**
  * @function changeStylesheet
  * Change style sheet of the App
  *
  * @param {string} stylesheet
  * @param {string} stylefile
  */
  changeStylesheet(stylesheet: string, stylefile: string) {
    const url = './assets/css/' + stylefile + '.css';
    document.getElementById(stylesheet).setAttribute('href', url);
  }

}
