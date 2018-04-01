import { Directive, HostListener } from '@angular/core';

// GK - Alphabet
import { LocalStorageService } from '../../nga/services/localStorage.service';
import { StateManagementService } from '../../nga/services/stateManagement.service';
import { UtilsService } from '../../nga/services/utils.service';

/**
* @module AppLayoutWrapperToggleDirective
* LAYOUT WRAPPER
* Status:
*  - Overlay:
*  - Static:   layout-wrapper-static
* Behavious:
*  - Logo anchor
*  - Menu
*
* @function toggleOpen
*/
@Directive({
  selector: '[appLayoutWrapperToggle]',
})
export class AppLayoutWrapperToggleDirective {
  constructor(
    private stateManagementService: StateManagementService,
    private localStorageService: LocalStorageService,
    private utilsService: UtilsService
  ) { }

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

/**
* @module AppLayoutSidebarToggleWebModeDirective
* LAYOUT SIDEBAR - WEB (MOUSE) MODE
* Status:
*  - Small:
*  - No show:
*  - Full show:   layout-sidebar-active
* Behavious:
*  - Mouse Enter / Mouse Leave
*
* @function onmouseenter
* @function onmouseleave
*/
@Directive({
  selector: '[appLayoutSidebarToggleWebMode]'
})
export class AppLayoutSidebarToggleWebModeDirective {
  constructor(
    private stateManagementService: StateManagementService,
    private utilsService: UtilsService
  ) { }

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

/**
* @module AppLayoutSidebarToggleMobileModeDirective
* LAYOUT SIDEBAR - MOBILE (TOUCH) MODE
* Status:
*  - Small:
*  - No show:
*  - Full show:   layout-sidebar-active
* Behavious:
*  - Mouse Enter / Mouse Leave
*
* @function toggleOpen
* @function onmouseenter
* @function onmouseleave
*/
@Directive({
  selector: '[appLayoutSidebarToggleMobileMode]'
})
export class AppLayoutSidebarToggleMobileModeDirective {
  constructor(
    private stateManagementService: StateManagementService,
    private localStorageService: LocalStorageService,
    private utilsService: UtilsService
  ) { }

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

export const APP_SIDEBAR_TOGGLE_DIRECTIVES = [
    AppLayoutWrapperToggleDirective,
    AppLayoutSidebarToggleWebModeDirective,
    AppLayoutSidebarToggleMobileModeDirective
];
