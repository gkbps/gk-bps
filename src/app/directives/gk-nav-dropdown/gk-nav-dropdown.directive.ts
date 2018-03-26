import { Directive, HostListener } from '@angular/core';
import { UtilsService } from '../../nga/services/utils.service';

/**
* @module GkNavProfileDirective
* Directive to add/ remove class for profile menu - web mode
*
* @event toggleOpen
*/
@Directive({
  selector: '[gkNavProfile]'
})
export class GkNavProfileDirective {
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
* @module GkNavProfileMobileDirective
* Directive to add/ remove class for profile menu - mobile mode
*
* @event toggleOpen
*/
@Directive({
  selector: '[gkNavProfileMobile]'
})
export class GkNavProfileMobileDirective {
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
* @module GkNavSettingDirective
* Directive to add/ remove class for setting menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[gkNavSetting]'
})
export class GkNavSettingDirective {
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
* @module GkNavLanguageDirective
* Directive to add/ remove class for language menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[gkNavLanguage]'
})
export class GkNavLanguageDirective {
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
* @module GkNavMessageDirective
* Directive to add/ remove class for message menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[gkNavMessage]'
})
export class GkNavMessageDirective {
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
* @module GkNavNotificationDirective
* Directive to add/ remove class for notification menu
*
* @event toggleOpen
*/
@Directive({
  selector: '[gkNavNotification]'
})
export class GkNavNotificationDirective {
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

export const GK_NAV_DROPDOWN_DIRECTIVES = [
    GkNavProfileDirective,
    GkNavSettingDirective,
    GkNavLanguageDirective,
    GkNavMessageDirective,
    GkNavNotificationDirective,
    GkNavProfileMobileDirective,
];
