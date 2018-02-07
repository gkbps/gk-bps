// External
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
// TranslatePipe

// Internal
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  SecurityService,
  TcodeService,
  NavigationService,
} from '../../../nga/services';

@Component({
  selector: 'h-nav-board',
  templateUrl: './hNavBoard.html',
  styleUrls: [
    './ihover.scss',
    './hNavBoard.scss'
  ],
})

export class HNavBoard implements OnInit, OnDestroy {

  myScope = 'h-nav-board';

  @Input() title: string;
  @Input() navItems: any[];

  navType = 'circle';
  navEffect = 'effect1';
  isSmall = false;
  bgStatus = false;

  assetPath: String = 'assets/';
  userRights: any[];

  navDirection = 0;
  navAnimateLength = 1;
  navAnimate = [
    [
      'left_to_right',
      'right_to_left',
      'top_to_bottom',
      'bottom_to_top'
    ],
    [
      'scale_up',
      'scale_down',
      'scale_down_up'
    ],
    [
      'left_to_right',
      'right_to_left'
    ],
    [
      'top_to_bottom',
      'bottom_to_top'
    ],
    [
      'from_left_and_right',
      'top_to_bottom',
      'bottom_to_top'
    ],
    [
      'from_top_and_bottom',
      'from_left_and_right',
      'top_to_bottom',
      'bottom_to_top'
    ],
    [
      'left_and_right',
      'top_to_bottom',
      'bottom_to_top'
    ]
  ];

  constructor(
    private router: Router,
    private translate: TranslateService,

    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() {
    this.navigationService.trackHistory();

    // To use userMana to show or hide relevant or irrelevant tcode
    const currentUser: any = this.securityService.getCurrentUser();
    this.userRights = this.securityService.getMana();

    // To set up Navigation UI
    this.navType = this.localStorageService.getNavType();
    this.navEffectReflection(this.localStorageService.getNavEffect());
    this.isSmall = this.localStorageService.getNavSize();
  }

  toggleBackground() {
    this.bgStatus = !this.bgStatus;
  }

  toggleNavType(navType) {
    if (this.navType!=navType) {
      this.navType = navType;
      this.navEffectReflection(this.navEffect);
    }
  }

  navEffectReflection(navEffect) {
    this.navEffect = navEffect;

    if (this.navType === 'circle') {

      switch (this.navEffect) {
        case 'effect6':
          this.navDirection = 1;
          break;
        case 'effect10':
        case 'effect20':
          this.navDirection = 3;
          break;
        case 'effect13':
          this.navDirection = 4;
          break;
        case 'effect15':
        case 'effect16':
          this.navDirection = 2;
          break;
        default:
          this.navDirection = 0;
      }

    } else {

      switch (this.navEffect) {
        case 'effect1':
          this.navDirection = 6;
          break;
        case 'effect3':
          this.navDirection = 3;
          break;
        case 'effect5':
          this.navDirection = 2;
          break;
        case 'effect6':
          this.navDirection = 5;
          break;
        case 'effect8':
          this.navDirection = 1;
          break;
        case 'effect2':
        case 'effect4':
        case 'effect7':
        case 'effect9':
        case 'effect10':
        case 'effect11':
        case 'effect12':
        case 'effect13':
        case 'effect14':
        case 'effect15':
          this.navDirection = 0;
          break;
        default:
          const SquareEffect = [
            'effect1', 'effect2', 'effect3', 'effect4', 'effect5',
            'effect6', 'effect7', 'effect8', 'effect9', 'effect10',
            'effect11', 'effect12', 'effect13', 'effect14', 'effect15',
          ];
          if (!SquareEffect.includes(this.navEffect)) {
            this.navEffect = 'effect15';
            this.navDirection = 0;
          }
          break;
      }
    }
  }

  toggleSize() {
    this.isSmall = !this.isSmall;
    this.localStorageService.setNavSize(this.isSmall);
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.translate.use(lang);
    });

    this.globalState.subscribeEvent('navType', this.myScope, (navType) => {
      console.log(navType);
      this.navType = navType;
      this.localStorageService.setNavType(navType);
    });

    this.globalState.subscribeEvent('navEffect', this.myScope, (navEffect) => {
      console.log(navEffect);
      this.navEffect = navEffect;
      this.navEffectReflection(navEffect);
      this.localStorageService.setNavEffect(navEffect);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.globalState.unsubscribeEvent('navType', this.myScope);
    this.globalState.unsubscribeEvent('navEffect', this.myScope);
  }
}
