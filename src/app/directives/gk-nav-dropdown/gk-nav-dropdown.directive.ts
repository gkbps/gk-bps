import { Directive, HostListener } from '@angular/core';
import { UtilsService } from '../../nga/services/utils.service';

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
    // console.log($event);

    const element = document.getElementById('profile-item');
    if (this.utilsService.hasClass(element, 'active-topmenuitem')) {
      element.classList.remove('active-topmenuitem');
    } else {
      element.classList.add('active-topmenuitem');
      document.getElementById('setting-item').classList.remove('active-topmenuitem');
      document.getElementById('message-item').classList.remove('active-topmenuitem');
      document.getElementById('notification-item').classList.remove('active-topmenuitem');
    }
  }
}

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
    // console.log($event);

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
    // console.log($event);

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
    // console.log($event);

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
    // console.log($event);

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
    // console.log($event);

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
