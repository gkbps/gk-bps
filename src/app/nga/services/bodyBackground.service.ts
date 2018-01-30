import { Injectable } from '@angular/core';

@Injectable()
export class BodyBackgroundService {

  constructor( ) {
  }

  clearBodyBackground() {
    // Change background
    const element = document.getElementsByTagName('body')[0];
    element.removeAttribute('class');
  }

  setBodyBackground(strClass: string) {
    const element = document.getElementsByTagName('body')[0];
    element.removeAttribute('class');
    element.className = strClass;
  }

}
