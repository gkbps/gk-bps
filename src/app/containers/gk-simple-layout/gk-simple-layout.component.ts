import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ngx-toasty';

// GK - Alphabet
import { BodyBackgroundService } from '../../nga/services';
import { GlobalState } from '../../global.state';
import { LoaderService } from '../../nga/services';
import { LocalStorageService } from '../../nga/services';
import { StateManagementService } from '../../nga/services';

/**
* @module GkSimpleLayoutComponent
*
* @param myScope
*
* @param sbTitle
* @param sbFullScreen
* @param sbVisibility
* @param sbPosition
* @param sbSizeList
*
* @param blocked
*
* @param alertIcon
* @param alertMsg
* @param toastyTimeOut
* @param toastyTheme
* @param toastyPosition
* @param toastOptions
*/
@Component({
  selector: 'gk-simple-layout',
  templateUrl: './gk-simple-layout.component.html',
})
export class GkSimpleLayoutComponent implements OnInit, OnDestroy {

  myScope = 'gk-simple-layout';

  // System wide Sidebar
  sbTitle = 'Sidebar Title';
  sbFullScreen = false;
  sbVisibility = false;
  sbPosition = 'right';
  sbSize = 'lg';

  sbSizeList = {
    sm: 'ui-sidebar-sm',
    md: 'ui-sidebar-md',
    lg: 'ui-sidebar-lg'
  };

  // System wide progress
  blocked = false;

  // System wide alert
  alertIcon: string;
  alertMsg: string;

  // System wide toasty
  toastyTimeOut = 5000;
  toastyTheme = 'material';
  toastyPosition = 'top-right';
  toastOptions: ToastOptions;

  constructor(
    private toastyConfig: ToastyConfig,
    private toastyService: ToastyService,

    private bodyBackgroundService: BodyBackgroundService,
    private globalState: GlobalState,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private stateManagementService: StateManagementService,
  ) {
  }

  ngOnInit(): void {
    this.subscribeLocalState();

    this.stateManagementService.initState();
    this.bodyBackgroundService.clearBodyBackground();

    // Reinstate user preference
    this.toastyTheme = this.localStorageService.getToastyTheme();
    this.toastyTimeOut = this.localStorageService.getToastyTimeOut();
    this.toastyPosition = this.localStorageService.getToastyPosition();
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    // System wide alert
    // Check http server to get alert

    // Toasty
    this.globalState.subscribeEvent('toasty', '', (toastData) => {
      console.log(toastData);
      this.toastOptions = {
        title: toastData.title,
        msg: toastData.msg,
        showClose: toastData.showClose || true,

        timeout: this.toastyTimeOut,
        theme: this.toastyTheme,
        onAdd: (toast: ToastData) => {
          console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function(toast: ToastData) {
          console.log('Toast ' + toast.id + ' has been removed!');
        }
      };

      switch (toastData.type) {
        case 'info':
          this.toastyService.info(this.toastOptions);
          break;
        case 'success':
          this.toastyService.success(this.toastOptions);
          break;
        case 'wait':
          this.toastyService.wait(this.toastOptions);
          break;
        case 'error':
          this.toastyService.error(this.toastOptions);
          break;
        case 'warning':
          this.toastyService.warning(this.toastOptions);
          break;
        default:
          this.toastyService.default(this.toastOptions);
          break;
      }
    });

    // Progress Bar
    this.loaderService.getState().subscribe(state => {
      setTimeout(() => { this.blocked = state.show || false; }, 0);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('toasty', '');
  }

}
