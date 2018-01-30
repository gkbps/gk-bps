import { Injectable } from '@angular/core';

@Injectable()
export class ArrayService {

  constructor() {
  }

  /*****************************************************************************
   * ARRAY
   * checkElementInArray
   * getLengthArrayOfObject
   *****************************************************************************/

   checkElementInArray(elem, arr): boolean {
     return (arr.indexOf(elem) > -1);
   }

   // To return number of objects exists in an array
   getLengthArrayOfObject(obj): number {
     let result = 0;
     for ( const prop in obj ) {
       if (obj.hasOwnProperty(prop)) {
         result++;
       }
     }
     return result;
   }

   // Sort array of objects
   compare(a, b, prop) {
     if (a[prop] < b[prop]) { return -1; }
     if (a[prop] > b[prop]) { return 1; }
     return 0;
   }

   // Array of object difference math based on unique ID
   operation(list1, list2, isUnion) {
       return list1.filter( a => isUnion === list2.some( b => a.id === b.id ) );
   }

   inBoth(list1, list2) {
       return this.operation(list1, list2, true);
   }

   inFirstOnly(list1, list2) {
       return this.operation(list1, list2, false);
   }

   inSecondOnly(list1, list2) {
       return this.inFirstOnly(list2, list1);
   }

   // Get remaining arrays
   getAvailable(population, selected) {
     let available = JSON.parse(JSON.stringify(population));
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
