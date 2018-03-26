import { Injectable } from '@angular/core';

/**
* @module UtilsService
* Utilities Service for the App
*
* @function isJsonString
* @function hasClass
*/
@Injectable()
export class UtilsService {

  constructor( ) { }

  /**
  * @function isJsonString
  * Check if string is JSON compatible
  *
  * @param {string} str
  *
  * @return {boolean}
  */
  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
  * @function hasClass
  * Check if DOM element has a class
  *
  * @param {any} target
  * @param {string} elementClassName
  *
  * @return {boolean}
  */
  hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
  }

}
