import { Injectable } from '@angular/core';

/**
* @module ArrayService
* Service contains helpers for array
*
* @function checkElementInArray
* @function getLengthArrayOfObject
* @function compare
*
* @function operation
* @function inBoth
* @function inFirstOnly
* @function inSecondOnly
*
* @function getAvailable
*/
@Injectable()
export class ArrayService {

  constructor() { }

  /**
  * @function checkElementInArray
  * Check if an element is included in an array
  *
  * @param {primative value} el
  * @param {array} arr
  *
  * @return {boolean}
  */
  checkElementInArray(el, arr): boolean {
    return (arr.indexOf(el) > -1);
  }

  /**
  * @function getLengthArrayOfObject
  * To return number of objects exists in an array
  *
  * @param {array} obj
  *
  * @return {number}
  */
  getLengthArrayOfObject(obj): number {
    let result = 0;
    for ( const prop in obj ) {
      if (obj.hasOwnProperty(prop)) {
        result++;
      }
    }
    return result;
  }

  /**
  * @function compare
  * Sort array of objects
  *
  * @param {array} a
  * @param {array} b
  * @param prop
  */
  compare(a, b, prop) {
    if (a[prop] < b[prop]) { return -1; }
    if (a[prop] > b[prop]) { return 1; }
    return 0;
  }

  /**
  * @function operation
  * Array of object difference math based on unique ID
  *
  * @param {array} list1
  * @param {array} list2
  * @param {boolean} isUnion
  */
  operation(list1, list2, isUnion) {
    return list1.filter( a => isUnion === list2.some( b => a.id === b.id ) );
  }

  /**
  * @function inBoth
  * Return an array that contains elements in both list1 and list2
  *
  * @param {array} list1
  * @param {array} list2
  *
  * @return {array}
  */
  inBoth(list1, list2) {
    return this.operation(list1, list2, true);
  }

  /**
  * @function inFirstOnly
  * Return an array that contains elements in list1 and NOT in list2
  *
  * @param list1
  * @param list2
  *
  * @return {array}
  */
  inFirstOnly(list1, list2) {
    return this.operation(list1, list2, false);
  }

  /**
  * @function inSecondOnly
  * Return an array that contains elements in list2 and NOT in list1
  *
  * @param list1
  * @param list2
  *
  * @return {array}
  */
  inSecondOnly(list1, list2) {
    return this.inFirstOnly(list2, list1);
  }

   // Get remaining arrays
   /**
   * @function getAvailable
   * Return an array that contains elements available for further selection from a population
   *
   * @param population
   * @param selected
   *
   * @return {array}
   */
   getAvailable(population, selected) {
     const available = JSON.parse(JSON.stringify(population));
     for (let i = 0; i < available.length; i++) {
       for (let j = 0; j < selected.length; j++) {
         if (JSON.stringify(available[i]) === JSON.stringify(selected[j])) {
            available.splice(i, 1);
            break;
         }
       }
     }
     return available;
   }
}
