import { Injectable } from '@angular/core';

import { LocalStorageService } from './localStorage.service';
import { BodyBackgroundService } from './bodyBackground.service';

@Injectable()
export class StateManagementService {

  constructor(
    private localStorageService: LocalStorageService,
    private bodyBackgroundService: BodyBackgroundService,
  ) {
  }

  /**
   * To initialize current state of application once app change container
   */
  public initState(bg: string = '') {
    // Initialize background
    this.bodyBackgroundService.clearBodyBackground();
    if (bg) {
      this. bodyBackgroundService.setBodyBackground(bg);
    }

    // Initialize wrapper static status
    let env = this.localStorageService.getEnv();
    this.wrapperStatic(env.pref.wrapperStatic ? env.pref.wrapperStatic : false);
    this.sidebarDark(env.pref.dark);
  }

  /**
   * To manage state for sidebar including:
   * - wrapper static or overlay status of Anchor
   * - wrapper static or overlay status of Sidebar
   * - sidebar active of sidebar in mobile status
   * - light or dark status of Sidebar
   */
  public wrapperStatic(status: boolean = false) {
    let element = document.getElementById('layout-wrapper');
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
