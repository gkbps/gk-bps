import { Injectable } from '@angular/core';

// GK - Alphabet
import { BodyBackgroundService } from './bodyBackground.service';
import { LocalStorageService } from './localStorage.service';

/**
* @module StateManagementService
* Service to handle general state of the App UI
*
* @function initState
* @function wrapperStatic
* @function wrapperStaticForSidebar
* @function sidebarActive
* @function sidebarDark
*/

@Injectable()
export class StateManagementService {

  constructor(
    private bodyBackgroundService: BodyBackgroundService,
    private localStorageService: LocalStorageService,
  ) { }

  /**
  * @function initState
  * Initialize current state of App once app change container
  *
  * @param {string} bg
  */
  public initState(bg: string = '') {
    // Initialize background
    this.bodyBackgroundService.clearBodyBackground();
    if (bg) {
      this. bodyBackgroundService.setBodyBackground(bg);
    }

    // Initialize wrapper static status
    const env = this.localStorageService.getEnv();
    this.wrapperStatic(env.pref.wrapperStatic ? env.pref.wrapperStatic : false);
    this.sidebarDark(env.pref.dark);
  }

  /**
  * States for sidebar including:
  * - wrapper static or overlay status of Anchor
  * - wrapper static or overlay status of Sidebar
  * - sidebar active of sidebar in mobile status
  * - light or dark status of Sidebar
  */

  /**
  * @function wrapperStatic
  * Wrapper static or overlay status of Anchor
  *
  * @param {boolean} status
  */
  public wrapperStatic(status: boolean = false) {
    const element = document.getElementById('layout-wrapper');
    if (element) {
      if (status) {
        // console.log('Add layout-wrapper-static to Wrapper');
        element.classList.add('layout-wrapper-static');
      } else {
        // console.log('Remove layout-wrapper-static to Wrapper')
        element.classList.remove('layout-wrapper-static');
      }
    }
  }

  /**
  * @function wrapperStaticForSidebar
  * Wrapper static or overlay status of Sidebar
  *
  * @param {boolean} status
  */
  public wrapperStaticForSidebar(status: boolean = false) {
    const element = document.getElementById('layout-sidebar');
    if (element) {
      if (status) {
        // console.log('Add layout-wrapper-static to Sidebar');
        element.classList.add('layout-wrapper-static');
      } else {
        // console.log('Remove layout-wrapper-static to Sidebar');
        element.classList.remove('layout-wrapper-static');
      }
    }
  }

  /**
  * @function sidebarActive
  * Sidebar active of sidebar in mobile status
  *
  * @param {boolean} status
  */
  public sidebarActive(status = false) {
    const element = document.getElementById('layout-sidebar');
    if (element) {
      if (status) {
        // console.log('Add layout-sidebar-active to Sidebar');
        element.classList.add('layout-sidebar-active');
      } else {
        // console.log('Remove layout-sidebar-active to Sidebar');
        element.classList.remove('layout-sidebar-active');
      }
    }
  }

  /**
  * @function sidebarDark
  * Light or dark status of Sidebar
  *
  * @param {boolean} status
  */
  public sidebarDark(status = false) {
    const element = document.getElementById('layout-sidebar');
    if (element) {
      if (status) {
        // console.log('Add layout-sidebar-active to Sidebar');
        element.classList.add('layout-sidebar-dark');
      } else {
        // console.log('Remove layout-sidebar-active to Sidebar');
        element.classList.remove('layout-sidebar-dark');
      }
      this.localStorageService.setDark(status);
    }
  }

}
