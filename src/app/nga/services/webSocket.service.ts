import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';

// import { environment } from '../environments/environment';

/**
* @module WebsocketService
* Service for websocket
*
* @function connect
*/
@Injectable()
export class WebsocketService {

  // Socket connection
  private socket;

  constructor(
    private appConfig: AppConfig
  ) { }

  /**
  * @function connect
  * Connect to server via websocket
  *
  * @return {subject}
  */
  connect(): Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    // environment.ws_url
    this.socket = io(this.appConfig.chatUrl);

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable(_observer => {
        this.socket.on('message', (data) => {
          // console.log('Received message from Websocket Server');
          _observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

}
