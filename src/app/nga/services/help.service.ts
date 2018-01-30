import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorageService } from './localStorage.service';

@Injectable()
export class HelpService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
  ) {
  }

  getHelpFromHTMLFile(HTMLFile): Observable<any> {
    const lang = this.localStorageService.getLang();
    const file = 'assets/help/' + HTMLFile + '.' + lang + '.html';

    return this.http.get(file)
      .map((res: any) => res._body)
      .catch((error: any) => {
        console.log(error);
        return Promise.resolve(error);
      });
   }

}
