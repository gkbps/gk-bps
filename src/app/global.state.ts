import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalState {

  // Initial
  // Subject serve as Observer and Observable
  // private _data = new Subject<Object>();
  // private _dataStream$ = this._data.asObservable();
  // private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  // Transition
  // private _data1 = new Subject<Object>();
  // private _dataStream1$ = this._data1.asObservable();
  // private _subscriptions1: any[] = [
  //   { event: 'event1', scope: 'scope1', data: (data) => { console.log(data, '1.1'); } },
  //   { event: 'event1', scope: 'scope2', data: (data) => { console.log(data, '1.2'); } },
  //   { event: 'event2', scope: 'scope3', data: (data) => { console.log(data, '2.3'); } },
  //   { event: 'event2', scope: 'scope4', data: (data) => { console.log(data, '2.4'); } },
  // ];

  // Final
  private _myData = new Subject<Object>();
  private _myDataStream$ = this._myData.asObservable();
  private _mySubscriptions: any[] = [];

  constructor() {
    // Initial
    // this._dataStream$.subscribe((data) => this._onEvent(data));

    // Transition
    // this._dataStream1$.subscribe((data1) => this._onEvent1(data1));

    // Final
    this._myDataStream$.subscribe((myData) => this._onMyEvent(myData));
  }

  /*
   * Execute registered callbacks once event occurs and change state
   */
  // Initial
  // _onEvent(data: any) {
  //   let subscribers = this._subscriptions.get(data['event']) || [];
  //   subscribers.forEach((callback) => {
  //     callback.call(null, data['data']);
  //   });
  // }

  // Transition
  // _onEvent1(data1: any) {
  //   let subscribers1 = this.getSubscriptionItemByEvent(data1['event']) || [];
  //   console.log(subscribers1);

  //   subscribers1.forEach((subscriptionItem) => {
  //     subscriptionItem['data'].call(null, data1['data']);
  //   });
  // }

  // Final
  _onMyEvent(myData: any) {
    let mySubscribers = this.getMySubscriptionItemByEvent(myData['event']) || [];
    // console.log(mySubscribers);
    // console.log(myData);

    mySubscribers.forEach((subscriptionItem) => {
      subscriptionItem['data'].call(null, myData['data']);
    });
  }

  // Transition
  // getSubscriptionItemByEvent(event) {
  //   return this._subscriptions1.filter((element) => {
  //     return (element['event'] === event);
  //   });
  // }

  // getSubscriptionItemByEventAndScope(event, scope) {
  //   return this._subscriptions1.filter((element) => {
  //     return ((element['event'] === event) && (element['scope'] === scope));
  //   });
  // }

  // getFirstSubscriptionItemByEventAndScope(event, scope) {
  //   const result =  this._subscriptions1.filter((element) => {
  //     return ((element['event'] === event) && (element['scope'] === scope));
  //   });
  //   return result[0] || {};
  // }

  // pushSubscriptionItem(subscriptionItem) {
  //   this._subscriptions1.push(subscriptionItem);
  // }

  // Final
  getMySubscriptionItemByEvent(event) {
    return this._mySubscriptions.filter((element) => {
      return (element['event'] === event);
    });
  }

  getMySubscriptionItemByEventAndScope(event, scope) {
    return this._mySubscriptions.filter((element) => {
      return ((element['event'] === event) && (element['scope'] === scope));
    });
  }

  pushMySubscriptionItem(subscriptionItem) {
    this._mySubscriptions.push(subscriptionItem);
    // console.log(this._mySubscriptions);
  }

  /*
   * Notify new value for an event
   */
  // Initial
  // notifyDataChanged(event, value) {
  //   // console.log(event, value);
  //   let current = this._data[event];
  //   if (current !== value) {
  //     this._data[event] = value;
  //     this._data.next({
  //       event: event,
  //       data: this._data[event]
  //     });
  //   }
  // }

  // Transition
  // notifyDataChanged1(event, scope, value) {
  //   this._data1.next({
  //     event: event,
  //     tcode: scope,
  //     data: value
  //   });
  // }

  // Final
  notifyMyDataChanged(event, scope, value) {
    // console.log(event, scope, value);

    this._myData.next({
      event: event,
      scope: scope,
      data: value
    });
  }

  /*
   * Register a callback in callback array for a particular event
   */
  // Initial
  // subscribe(event: string, callback: Function) {
  //   // Get array of callback of event
  //   let subscribers = this._subscriptions.get(event) || [];

  //   // Insert new callback
  //   subscribers.push(callback);

  //   // Update event registry
  //   this._subscriptions.set(event, subscribers);

    // console.log(this._subscriptions);
    // console.log(this.getSubscriptionItemByEvent('event1'));
    // console.log(this.getSubscriptionItemByEventAndScope('event2', 'scope3'));
    // const dat = { event: 'event3', scope: 'scope5', data: () => {} };
    // this.pushSubscriptionItem(dat);
    // this.subscribe1('event3', 'scope5', () => {});
    // console.log(this._subscriptions1);
    // this.notifyDataChanged1('event1', 'scope2', 'abc');
    // this.unsubscribe1('event2', 'scope3');
    // console.log(this._subscriptions1);
  // }

  // Transition
  // subscribe1(event: string, scope: string, callback: Function) {
  //   this.pushSubscriptionItem({
  //     event: event,
  //     scope: scope,
  //     data: callback
  //   });
  // }

  // Final
  subscribeEvent(event: string, scope: string, callback: Function) {
    this.pushMySubscriptionItem({
      event: event,
      scope: scope,
      data: callback
    });
  }

  /*
   * Unsubscribe last callback of a particular event from the event register
   */
  // unsubscribe(event: string) {
  //   if (this._subscriptions.has(event)) {
  //    this._subscriptions.get(event).pop();
  //    if (this._subscriptions.get(event).length == 0) {
  //      this._subscriptions.delete(event);
  //    }
  //  } else {
  //    console.log('Event :' + event + ' not exists!');
  //  }
  // }

  // unsubscribe1(event: string, scope: string) {
  //   for (let i = 0; i < this._subscriptions1.length; i++) {
  //     if ((this._subscriptions1[i]['event'] === event) && (this._subscriptions1[i]['scope'] === scope)) {
  //       this._subscriptions1.splice(i, 1);
  //       break;
  //     }
  //   }
  //   console.log(this._subscriptions1);
  // }

  unsubscribeEvent(event: string, scope: string) {
    for (let i = 0; i < this._mySubscriptions.length; i++) {
      if ((this._mySubscriptions[i]['event'] === event) && (this._mySubscriptions[i]['scope'] === scope)) {
        this._mySubscriptions.splice(i, 1);
        break;
      }
    }
    // console.log(this._mySubscriptions);
  }

  /*
   * Unscribe all events from the event register
   */
  // unsubscribeAll() {
  //   this._mySubscriptions.clear();
  //   // console.log(this._subscriptions);
  // }

}
