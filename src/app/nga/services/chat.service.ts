import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { SecurityService } from './security.service';

@Injectable()
export class ChatService {

  messages: Subject<any>;
  prefix = '/chat/';

  // Our constructor calls our wsService connect method
  constructor(
    private wsService: WebsocketService,
    private http: Http,
    private config: AppConfig,
    private securityService: SecurityService,
  ) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      });
   }

  // Our simplified interface for sending messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

  registerRoom() {
    return this.http.get(
        this.config.apiUrl + this.prefix + 'register',
        this.securityService.jwt(),
      )
    .map((response: Response) => response.json());
  }

  unsubscribe() {
    this.messages.unsubscribe();
    // this.wsService.disconnect();
  }
}
