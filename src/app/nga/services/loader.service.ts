import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
* @module LoaderService
* Service handle loader at sytem wide level
*
* @function getState
* @function show
* @function hide
*/
@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<any>();

  // Use "loaderState" or "getState()" to get observable result via subscribe
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  /**
  * @function getState
  * Return the state of loader as observable
  */
  getState(): Observable<any> {
    return this.loaderSubject.asObservable();
  }

  /**
  * @function show
  * Show the loader by changing status
  */
  show() {
    this.loaderSubject.next({show: true});
  }

  /**
  * @function show
  * Hide the loader by changing status
  */
  hide() {
    setTimeout(() => {
      this.loaderSubject.next({show: false});
    }, 2500);
  }

}

// For typescript
// export interface LoaderState {
//   show: boolean;
// }
// private loaderSubject = new Subject<LoaderState>();
// this.loaderSubject.next(<LoaderState>{show: true});
// this.loaderSubject.next(<LoaderState>{show: false});
