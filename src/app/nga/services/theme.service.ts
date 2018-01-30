import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from './localStorage.service';

@Injectable()
export class ThemeService {
  private layout = new Subject<any>();
  private theme = new Subject<any>();

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  changeLayout(layout: string) {
    const url = './assets/layout/css/layout-' + layout + '.css';
    document.getElementById('layout-css').setAttribute('href', url);
    this.localStorageService.setLayout(layout);
  }

  getLayout(): Observable<any> {
    return this.layout.asObservable();
  }

  changeTheme(theme: string) {
    const url = './assets/theme/theme-' + theme + '.css';
    document.getElementById('theme-css').setAttribute('href', url);
    this.localStorageService.setTheme(theme);
  }

  getTheme():  Observable<any> {
    return this.theme.asObservable();
  }

  changeStylesheet(stylesheet: string, stylefile: string) {
    const url = './assets/css/' + stylefile + '.css';
    document.getElementById(stylesheet).setAttribute('href', url);
  }

}
