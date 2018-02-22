import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface LoaderState {
  show: boolean;
}

@Injectable()
export class LoaderService {

  // private loaderSubject = new Subject<LoaderState>();
  private loaderSubject = new Subject<any>();

  // User "loaderState" or "getState()" to get observable result via subscribe
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  getState(): Observable<any> {
    return this.loaderSubject.asObservable();
  }

  show() {
    // this.loaderSubject.next(<LoaderState>{show: true});
    this.loaderSubject.next({show: true});
  }

  hide() {
    // this.loaderSubject.next(<LoaderState>{show: false});
    setTimeout(() => {
      this.loaderSubject.next({show: false});
    }, 2500);
  }

}
