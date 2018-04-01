import { Directive, HostListener } from '@angular/core';
import { UtilsService } from '../../nga/services/utils.service';

/**
* @module AppNavProfileDirective
* Directive to add/ remove class for profile menu - web mode
*
* @event toggleOpen
*/
@Directive({
  selector: '[appNavProfile]'
})
export class AppNavProfileDirective {
  constructor(
    private utilsService: UtilsService
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    const element = document.getElementById('profile-item');
    if (this.utilsService.hasClass(element, 'active-topmenuitem')) {
      element.classList.remove('active-topmenuitem');
    } else {
      element.classList.add('active-topmenuitem');
      document.getElementById('setting-item').classList.remove('active-topmenuitem');
      document.getElementById('notification-item').classList.remove('active-topmenuitem');
      document.getElementById('message-item').classList.remove('active-topmenuitem');
    }
  }
}

/**
* @module AppNavProfileMobileDirective
* Directive to add/ remove class for profile menu - mobile mode
*
* @event toggleOpen
*/
@Directive({
  selector: '[appNavProfileMobile]'
})
export class AppNavProfileMobileDirective {
  constructor(
    private utilsService: UtilsService
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    const element = document.getElementById('profile-item-mobile');
    if (this.utilsService.hasClass(element, 'topbar-menu-active')) {
      element.classList.remove('topbar-menu-active');
    } else {
      element.classList.add('topbar-menu-active');
      document.getElementById('setting-item').classList.remove('active-topmenuitem');
      document.getElementById('message-item').classList.remove('active-topmenuitem');
      document.getElementById('notification-item').classList.remove('active-topmenuitem');
    }
  }
}

/**
* @module AppNavSettingDirective
* Directive to add/ remove class for setting menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[appNavSetting]'
})
export class AppNavSettingDirective {
  constructor(
    private utilsService: UtilsService
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    const element = document.getElementById('setting-item');
    if (this.utilsService.hasClass(element, 'active-topmenuitem')) {
      element.classList.remove('active-topmenuitem');
    } else {
      element.classList.add('active-topmenuitem');
      document.getElementById('profile-item').classList.remove('active-topmenuitem');
      document.getElementById('language-item').classList.remove('active-topmenuitem');
      document.getElementById('message-item').classList.remove('active-topmenuitem');
      document.getElementById('notification-item').classList.remove('active-topmenuitem');
    }
  }
}

/**
* @module AppNavLanguageDirective
* Directive to add/ remove class for language menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[appNavLanguage]'
})
export class AppNavLanguageDirective {
  constructor(
    private utilsService: UtilsService
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    const element = document.getElementById('language-item');
    if (this.utilsService.hasClass(element, 'active-topmenuitem')) {
      element.classList.remove('active-topmenuitem');
    } else {
      element.classList.add('active-topmenuitem');
      document.getElementById('profile-item').classList.remove('active-topmenuitem');
      document.getElementById('setting-item').classList.remove('active-topmenuitem');
      document.getElementById('message-item').classList.remove('active-topmenuitem');
      document.getElementById('notification-item').classList.remove('active-topmenuitem');
    }
  }
}

/**
* @module AppNavMessageDirective
* Directive to add/ remove class for message menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[appNavMessage]'
})
export class AppNavMessageDirective {
  constructor(
    private utilsService: UtilsService
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    const element = document.getElementById('message-item');
    if (this.utilsService.hasClass(element, 'active-topmenuitem')) {
      element.classList.remove('active-topmenuitem');
    } else {
      element.classList.add('active-topmenuitem');
      document.getElementById('profile-item').classList.remove('active-topmenuitem');
      document.getElementById('setting-item').classList.remove('active-topmenuitem');
      document.getElementById('language-item').classList.remove('active-topmenuitem');
      document.getElementById('notification-item').classList.remove('active-topmenuitem');
    }
  }
}

/**
* @module AppNavNotificationDirective
* Directive to add/ remove class for notification menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[appNavNotification]'
})
export class AppNavNotificationDirective {
  constructor(
    private utilsService: UtilsService
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    const element = document.getElementById('notification-item');
    if (this.utilsService.hasClass(element, 'active-topmenuitem')) {
      element.classList.remove('active-topmenuitem');
    } else {
      element.classList.add('active-topmenuitem');
      document.getElementById('profile-item').classList.remove('active-topmenuitem');
      document.getElementById('setting-item').classList.remove('active-topmenuitem');
      document.getElementById('language-item').classList.remove('active-topmenuitem');
      document.getElementById('message-item').classList.remove('active-topmenuitem');
    }
  }
}

export const APP_NAV_DROPDOWN_DIRECTIVES = [
    AppNavProfileDirective,
    AppNavSettingDirective,
    AppNavLanguageDirective,
    AppNavMessageDirective,
    AppNavNotificationDirective,
    AppNavProfileMobileDirective,
];
