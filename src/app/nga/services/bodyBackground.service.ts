import { Injectable } from '@angular/core';

/**
* @module BodyBackgroundService
* Service modifies DOM class to change page background
*
* @function clearBodyBackground
* @function setBodyBackground
*/
@Injectable()
export class BodyBackgroundService {

  constructor( ) { }

  /**
  * @function clearBodyBackground
  * Remove DOM class of tag body
  */
  clearBodyBackground() {
    const element = document.getElementsByTagName('body')[0];
    element.removeAttribute('class');
  }

  /**
  * @function setBodyBackground
  * Add DOM class of tag body
  *
  * @param {string} strClass
  */
  setBodyBackground(strClass: string) {
    const element = document.getElementsByTagName('body')[0];
    element.removeAttribute('class');
    element.className = strClass;
  }

}
