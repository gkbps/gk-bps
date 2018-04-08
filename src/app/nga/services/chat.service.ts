import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppConfig } from '../../app.config';
import { HttpClientService } from './httpClient.service';
import { SecurityService } from './security.service';

/**
* @module ChatService
* Service for Chat App
*
* @function registerRoom
* @function sendMsg
*/
@Injectable()
export class ChatService {

  messages: Subject<any>;
  prefix = '/chat/';

  // Our constructor calls our wsService connect method
  constructor(
    private httpClient: HttpClient,
    private httpClientService: HttpClientService,
    private wsService: WebsocketService,

    private appConfig: AppConfig,
    private securityService: SecurityService,
  ) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response) => {
        return response;
      });
  }

   /**
   * @function registerRoom
   * Function to register a char room
   *
   * @return {Promise}
   */
   registerRoom() {
     return this.httpClient.get(
         this.appConfig.apiUrl + this.prefix + 'register',
         this.httpClientService.attachHeader()
       )
     .map((response) => {
       // console.log(response);
       return response;
     });
   }

  /**
  * @function sendMsg
  * Function to send messages tosocket.io server
  *
  * @param msg
  */
  sendMsg(msg) {
    this.messages.next(msg);
  }


  unsubscribe() {
    this.messages.unsubscribe();
    // this.wsService.disconnect();
  }
}
