import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService } from './localStorage.service';

/**
* @module LanguageService
* Change language for the App
*
* @function changeLanguage
* @function getLanguage
*/
@Injectable()
export class LanguageService {

  private lang = new Subject<any>();
  // itemArray = [];
  // res = [];
  // translatedMenu = [];

  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
  ) {
    // Initialize language
    translate.use(localStorage.getLang());
  }

  /**
  * @function changeLanguage
  * Update select language into local storage and emit language to listeners
  *
  * @param {string} lang
  */
  changeLanguage(lang: string) {
    this.localStorage.setLang(lang);
    this.lang.next(lang);
  }

  /**
  * @function getLanguage
  * Get selected language in observable stream
  */
  getLanguage(): Observable<any> {
    return this.lang.asObservable();
  }

}
