import { Directive, HostListener } from '@angular/core';
import {
  StateManagementService,
  LocalStorageService,
  UtilsService
} from '../../nga/services';

/*******************************************************************************
 * LAYOUT WRAPPER
 * Status:
 *  - Overlay:
 *  - Static:   layout-wrapper-static
 * Behavious:
 *  - Logo anchor
 *  - Menu
 *******************************************************************************/
@Directive({
  selector: '[gkLayoutWrapperToggle]',
})
export class GkLayoutWrapperToggleDirective {
  constructor(
    private stateManagementService: StateManagementService,
    private localStorageService: LocalStorageService,
    private utilsService: UtilsService
  ) { }

  // CLICK
  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    const element = document.getElementById('layout-wrapper');
    if (this.utilsService.hasClass(element, 'layout-wrapper-static')) {
      this.stateManagementService.wrapperStatic(false);
      this.localStorageService.setWrapperStatic(false);
    } else {
      this.stateManagementService.wrapperStatic(true);
      this.localStorageService.setWrapperStatic(true);
    }

    // Important: Prevent event propagate further and href automatically open
    $event.stopPropagation();
    return false;
  }

}

/*******************************************************************************
 * LAYOUT SIDEBAR - WEB (MOUSE) MODE
 * Status:
 *  - Small:
 *  - No show:
 *  - Full show:   layout-sidebar-active
 * Behavious:
 *  - Mouse Enter / Mouse Leave
 *******************************************************************************/
@Directive({
  selector: '[gkLayoutSidebarToggleWebMode]'
})
export class GkLayoutSidebarToggleWebModeDirective {
  constructor(
    private stateManagementService: StateManagementService,
    private utilsService: UtilsService
  ) { }

  // ON MOUSE ENTER
  @HostListener('mouseenter', ['$event'])
  onmouseenter($event: any) {
    $event.preventDefault();
    const element = document.getElementById('layout-sidebar');
    if (!this.utilsService.hasClass(element, 'layout-sidebar-active')) {
      this.stateManagementService.sidebarActive(true);
    }

    // Important: Prevent event propagate further and href automatically open
    $event.stopPropagation();
    return false;
  }

  // ON MOUSE LEAVE
  @HostListener('mouseleave', ['$event'])
  onmouseleave($event: any) {
    $event.preventDefault();
    const element = document.getElementById('layout-sidebar');
    if (this.utilsService.hasClass(element, 'layout-sidebar-active')) {
      this.stateManagementService.sidebarActive(false);
    }

    // Important: Prevent event propagate further and href automatically open
    $event.stopPropagation();
    return false;
  }
}

/*******************************************************************************
 * LAYOUT SIDEBAR - MOBILE (TOUCH) MODE
 * Status:
 *  - Small:
 *  - No show:
 *  - Full show:   layout-sidebar-active
 * Behavious:
 *  - Mouse Enter / Mouse Leave
 *******************************************************************************/
@Directive({
  selector: '[gkLayoutSidebarToggleMobileMode]'
})
export class GkLayoutSidebarToggleMobileModeDirective {
  constructor(
    private stateManagementService: StateManagementService,
    private localStorageService: LocalStorageService,
    private utilsService: UtilsService
  ) { }

  // CLICK ICON
  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    const element = document.getElementById('layout-sidebar');
    if (this.utilsService.hasClass(element, 'layout-sidebar-active')) {
      this.stateManagementService.sidebarActive(false);
    } else {
      this.stateManagementService.sidebarActive(true);
    }

    // Important: Prevent event propagate further and href automatically open
    $event.stopPropagation();
    return false;
  }

  // ON MOUSE ENTER
  @HostListener('mouseenter', ['$event'])
  onmouseenter($event: any) {
    $event.preventDefault();
    // console.log('mouseEnter Sidebar Mobile');
    const element = document.getElementById('layout-sidebar');
    if (!this.utilsService.hasClass(element, 'layout-sidebar-active')) {
      element.classList.add('layout-sidebar-active');
    }
    $event.stopPropagation();
    return false; // prevent a href automatically open
  }

  // ON MOUSE LEAVE
  @HostListener('mouseleave', ['$event'])
  onmouseleave($event: any) {
    $event.preventDefault();
    const element = document.getElementById('layout-sidebar');
    if (this.utilsService.hasClass(element, 'layout-sidebar-active')) {
      element.classList.remove('layout-sidebar-active');
    }

    // Important: Prevent event propagate further and href automatically open
    $event.stopPropagation();
    return false;
  }
}

export const GK_SIDEBAR_TOGGLE_DIRECTIVES = [
    GkLayoutWrapperToggleDirective,
    GkLayoutSidebarToggleWebModeDirective,
    GkLayoutSidebarToggleMobileModeDirective
];
