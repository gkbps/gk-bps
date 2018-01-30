import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TranslateService } from '@ngx-translate/core';

import {
  LocalStorageService
} from './localStorage.service';

@Injectable()
export class LanguageService {
  private lang = new Subject<any>();
  itemArray = [];
  res = [];
  translatedMenu = [];

  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
  ) {
    // Initialize language
    translate.use(localStorage.getLang());
  }

  changeLanguage(lang: string) {
    this.localStorage.setLang(lang);
    this.lang.next(lang);
  }

  getLanguage(): Observable<any> {
    return this.lang.asObservable();
  }

  /*
 getValuesByKey(object, key) {
    var values = [];
    JSON.stringify(object, function(k, v) {
      if (k === key) values.push(v);
      return v;
    });
    return values;
  }

  findAndReplace(menu, res) {
    console.log(menu);
  for (var i in menu) {

      if (menu[i]['items']) {
        console.log(menu[i]['items'])
        this.findAndReplace(menu[i]['items'], res);
      }

      if (res[menu[i]['label']]) {
        menu[i]["label"] = res[menu[i]['label']];
        // break; // uncomment to stop after first replacement
      }
    }
  }

  async transformMenu(menu) {
    this.translatedMenu = JSON.parse(JSON.stringify(menu));

    const translatedArray = this.getValuesByKey(menu, 'label');
    console.log(translatedArray);

    return await this.translate.get(translatedArray)
      .subscribe((res)=>{
        this.res = JSON.parse(JSON.stringify(res));
        this.findAndReplace(this.translatedMenu, this.res);
        console.log(this.translatedMenu);
        return Promise.resolve(this.translatedMenu);
      }
    );
  }
  */

}
