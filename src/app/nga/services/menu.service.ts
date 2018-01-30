import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorageService } from './localStorage.service';

@Injectable()
export class MenuService {

  private menu = new Subject<any>();
  fav: any = [];

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
  ) {
  }

  getMenu(): Observable<any> {
    return this.menu.asObservable();
  }

  getMenuFromJSONFile(jsonFile): Observable<any> {
    const file = 'assets/menu/' + jsonFile;

    return this.http.get(file)
      .map((res: any) => {
        let jsonMenu = res.json();
        let fav = this.localStorageService.getFav();
        const favTopPosition = this.localStorageService.getFavPosition();

        if (favTopPosition) {
          fav.push(...jsonMenu);
          jsonMenu = fav;
        } else {
          jsonMenu.push(...fav);
        }

        const combinedMenu = [{
          'data': { 'label': 'backToMain', 'icon': 'home', 'url': '/home' }
        }];
        combinedMenu.push(...jsonMenu);

        return combinedMenu;
      })
      .catch((error: any) => {
        console.log(error);
        return Promise.resolve(error);
      });
   }

  changeMenu(menu) {
    this.menu.next(menu);
  }


}
