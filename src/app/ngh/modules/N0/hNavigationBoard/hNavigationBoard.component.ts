import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services';
import { NavigationService } from '../../../../nga/services';
import { SecurityService } from '../../../../nga/services';
import { TcodeService } from '../../../../nga/services';

/**
* @module HNavigationBoard
* Navigation Board facilitate navigation to pages
* Two icon types available are Circle and Box with special effects.
*
* @example: 0x, 1x, 2x...
*/
@Component({
  selector: 'h-navigation-board',
  templateUrl: './hNavigationBoard.html',
  styleUrls: [
    './ihover.scss',
    './hNavigationBoard.scss'
  ],
})

export class HNavigationBoard implements OnInit, OnDestroy {

  myScope = 'h-navigation-board';

  @Input() title: string;
  @Input() navItems: any[];

  navType = 'circle';
  navEffect = 'effect1';
  isSmall = false;

  assetPath: String = 'assets/';

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

    const lang = this.localStorageService.getLang();
    this.translate.use(lang);

    // To reinstate user preference
    this.navType = this.localStorageService.getNavType();
    this.navEffectReflection(this.localStorageService.getNavEffect());
    this.isSmall = this.localStorageService.getNavSize();
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translate.use(lang);
    });

    this.globalState.subscribeEvent('navType', this.myScope, (navType) => {
      this.navType = navType;
      this.localStorageService.setNavType(navType);
    });

    this.globalState.subscribeEvent('navEffect', this.myScope, (navEffect) => {
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

  // COMPONENT OPERATION

  toggleNavType(navType) {
    if (this.navType !== navType) {
      this.navType = navType;
      this.localStorageService.setNavType(navType);
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

}
