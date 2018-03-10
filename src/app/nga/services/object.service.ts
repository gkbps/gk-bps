import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor( ) {
  }

  /*****************************************************************************
   * OBJECT
   * hasProp:        Check if a property exists in an Object
   *****************************************************************************/
   hasProp (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  hasOwnProperty(obj, prop) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop]);
  }

}
