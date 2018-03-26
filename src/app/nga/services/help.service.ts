import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorageService } from './localStorage.service';

/**
* @module HelpService
* Service to load help file based on the context
*
* @function getHelpFromHTMLFile
*/
@Injectable()
export class HelpService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  /**
  * @function getHelpFromHTMLFile
  * Get HTML content of a help file to build context based helps
  *
  * @param HTMLFile
  *
  * @return {Promise}
  */
  getHelpFromHTMLFile(HTMLFile): Observable<any> {
    const lang = this.localStorageService.getLang();
    const file = 'assets/help/' + HTMLFile + '.' + lang + '.html';

    return this.httpClient.get(file, { responseType: 'text' })
      .map((res) => {
        // console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return Promise.resolve(error);
      });
   }

}
