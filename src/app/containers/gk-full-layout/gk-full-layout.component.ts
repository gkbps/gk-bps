import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GlobalState } from '../../global.state';
import {
  StateManagementService,
  BodyBackgroundService,
  LocalStorageService,
  LoaderService
} from '../../nga/services';

@Component({
  selector: 'gk-full-layout',
  templateUrl: './gk-full-layout.component.html'
})
export class GkFullLayoutComponent implements OnInit, OnDestroy, OnChanges {
  myScope = 'gk-full-layout';

  blocked: boolean = false;

  notificationMode: boolean;
  notificationType: boolean;

  msgs: Message[];
  timeOut = 5000;
  myInterval: any;

  constructor(
    private slimLoadingBarService: SlimLoadingBarService,
    private globalState: GlobalState,

    private stateManagementService: StateManagementService,
    private bodyBackgroundService: BodyBackgroundService,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
    // this.loaderService.hide();

    this.timeOut = this.localStorageService.getTimeOut();
    this.subscribeLocalState();

    this.stateManagementService.initState();
    this.bodyBackgroundService.clearBodyBackground();

    // Reinstate user preference
    this.notificationMode = this.localStorageService.getNotificationMode();
    this.notificationType = this.localStorageService.getNotificationType();
    this.msgs = [];
  }

  ngOnChanges() {
  }
  
  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {

    this.globalState.subscribeEvent('notificationMessage', '', (notificationMessage) => {
      this.msgs.push(notificationMessage[0]);
      // console.log(this.msgs);
    });

    // ISSUE: If user close the growl mannually, then growl will not continue working
    this.myInterval = setInterval(()=> {
      // console.log('tick');
      if (this.msgs.length > 0) {
        this.msgs.splice(0, 1);
        // console.log(this.msgs);
      } else {
        // this.messageService.clear();
      }
    }, this.timeOut);

    this.loaderService.getState().subscribe(state => {

      setTimeout(() => {
        this.blocked = state.show || false;
        // console.log(this.blocked);

        if (state.show) {
          this.slimLoadingBarService.start(() => {
              console.log('Loading complete');
          });
        } else {
          this.slimLoadingBarService.complete();
        }

      }, 0);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('notificationMessage', '');
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  }

}
