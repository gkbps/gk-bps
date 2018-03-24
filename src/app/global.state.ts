import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
* @module GlobalState
* A service store manages state of key events at system wide level
* @example
* - Langugage Translation
* - Context based help
*
* Philosophy
* 1. Subscribe to listen an (event) at a particular (scope) and register a (callback) to be triggered
* 2. The global store will receive subscription and put it in a registry
* 3. Whenever an event happens, global store will go through the registry and execute registered (callback)
* 4. When a component, service, module, etc... is destroyed then the registered (callback) for (event) and (scope)
*    is removed out the registry
*    Note: that callback can be function or value
*
* @param {Subject<Object>}  _myData         Subject could serve as Observer or Observable
* @param {Observable}       _myDataStream   subscribe to the stream of events
* @param {Array}            _subscription   store array of events and serves as event registry
* {@link subscribeEvent}
*
* @function subscribeEvent                        (1) (2)
* @function notifyMyDataChanged                   (3)
* @function _onMyEvent                            (3)
* @function getMySubscriptionItemByEvent          (3)
* @function unsubscribeEvent                      (4)
*
* @function getMySubscriptionItemByEventAndScope  It's very rare to happen, just in case
*/
@Injectable()
export class GlobalState {

  private _myData                 = new Subject<Object>();
  private _myDataStream$          = this._myData.asObservable();
  private _mySubscriptions: any[] = [];

  constructor() {
    this._myDataStream$.subscribe((myData) => this._onMyEvent(myData));
  }

  /**
  * @function subscribeEvent
  * A service to register (event) at a particular module (scope) with a (callback) function
  *
  * @param {string} event        Name of event
  * @param {string} scope        Name of module, component...
  * @param {function} callback   Function to be excuted when event is triggered
  */
  subscribeEvent(event: string, scope: string, callback: Function) {
    this._mySubscriptions.push({
      event: event,
      scope: scope,
      data: callback
    });
  }

  /**
  * @function notifyMyDataChanged
  * A service that allow to emit/ trigger event from module, component level
  *
  * @param {string} event   Name of event
  * @param {string} scope   Name of scope
  * @param {any}    data    Data that pass to
  */
  notifyMyDataChanged(event, scope, data) {
    this._myData.next({
      event: event,
      scope: scope,
      data: data
    });
  }

  /**
  * @function _onMyEvent
  * A function that take from registry relevant subscription items and do callbacks
  *
  * @param {any} myData is anything but contain the event to be triggered
  * {@link getMySubscriptionItemByEvent}
  */
  _onMyEvent(myData: any) {
    let mySubscribers = this.getMySubscriptionItemByEvent(myData['event']) || [];
    // DEBUG
    // console.log(mySubscribers);
    // console.log(myData);

    mySubscribers.forEach((subscriptionItem) => {
      subscriptionItem['data'].call(null, myData['data']);
    });
  }

  /**
  * @function getMySubscriptionItemByEvent
  * Filter from event registry all subsciptions that match event triggered
  *
  * @returns {array} The array of subsciptions that have event name matched
  */
  getMySubscriptionItemByEvent(event) {
    return this._mySubscriptions.filter((element) => {
      return (element['event'] === event);
    });
  }

  /**
  * @function getMySubscriptionItemByEventAndScope
  * Filter from event registry all subsciptions that match event triggered in specific scope
  *
  * @returns {array} The array of subsciptions that have event and scope name matched
  */
  getMySubscriptionItemByEventAndScope(event, scope) {
    return this._mySubscriptions.filter((element) => {
      return ((element['event'] === event) && (element['scope'] === scope));
    });
  }

  /**
  * @function unsubscribeEvent
  * A service that unscribe/remove subscription item from event registry
  *
  * @param {string} event   Name of event
  * @param {string} scope   Name of scope
  */
  unsubscribeEvent(event: string, scope: string) {
    for (let i = 0; i < this._mySubscriptions.length; i++) {
      if ((this._mySubscriptions[i]['event'] === event) && (this._mySubscriptions[i]['scope'] === scope)) {
        this._mySubscriptions.splice(i, 1);
        break;
      }
    }
    // console.log(this._mySubscriptions);
  }

}
