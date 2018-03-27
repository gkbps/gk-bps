import { Injectable } from '@angular/core';

/**
* @module ObjectService
* Service contains all helpers for objects
*
* @function hasProp
* @function hasOwnProperty
*/
@Injectable()
export class ObjectService {

  constructor( ) { }

  /**
  * @function hasProp
  * Check if a property exists in an Object
  *
  * @return {boolean}
  */
  hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  /**
  * @function hasOwnProperty
  */
  hasOwnProperty(obj, prop) {
    const proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
      (!(prop in proto) || proto[prop] !== obj[prop]);
  }

}
