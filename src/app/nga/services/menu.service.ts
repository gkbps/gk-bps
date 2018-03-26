import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorageService } from './localStorage.service';

/**
* @module MenuService
* Service to load menu file based on the context
*
* @function getMenu
* @function getMenuFromJSONFile
* @function changeMenu
*/
@Injectable()
export class MenuService {

  private menu = new Subject<any>();
  fav: any = [];

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
  }

  /**
  * @function getMenu
  * Return the current menu as observable stream
  */
  getMenu(): Observable<any> {
    return this.menu.asObservable();
  }

  /**
  * @function getMenuFromJSONFile
  * Get menu content from json file to build sidebar menu
  *
  * @param {string} jsonFile
  *
  * @return {Promise}
  */
  getMenuFromJSONFile(jsonFile): Observable<any> {
    const file = 'assets/menu/' + jsonFile;

    return this.httpClient.get(file)
      .map((res: any) => {
        // console.log(res);
        let jsonMenu = res;
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

  /**
  * @function changeMenu
  * Change menu content by new menu
  *
  * @param {any} menu
  */
  changeMenu(menu) {
    this.menu.next(menu);
  }

}
