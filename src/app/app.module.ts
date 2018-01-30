/*******************************************************************************
 * IMPORT ANGULAR MODULES
 *******************************************************************************/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/*******************************************************************************
 * IMPORT 3RD PARTY MODULES
 *******************************************************************************/
// Scrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Scroll to
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Loading Bar
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// PrimeNg
/**
 * Growl: (gk-containers)
 * Messages: (gk-containers)
 * Progress bar: Show indefinite loading when interacting with server (gk-containers)
 * Overlay panel: Show HELP overlay panel (gk-breadcrumbs)
 * Dropdown: Show list of working years and legal entities (gk-working)
 */
import { ProgressBarModule } from 'primeng/primeng';
import {
  GrowlModule,
  MessagesModule,
  OverlayPanelModule,
  DropdownModule,
} from 'primeng/primeng';

import {
  ConfirmationService
} from 'primeng/primeng';

// Translate
import { TranslateService } from '@ngx-translate/core';

/*******************************************************************************
 * IMPORT GK MODULES & COMPONENTS
 *******************************************************************************/
import { AppComponent } from './app.component';
import { BaseComponent, TrayBaseComponent } from './views/base';
import { AppRoutingModule } from './app.routing';

// My Services - Register for global reference
import { AppConfig } from './app.config';
import { GlobalState } from './global.state';
import { NgaModule } from './nga/nga.module';

// Containers
import {
  GkFullLayoutComponent,
  GkSimpleLayoutComponent,
} from './containers';

const APP_CONTAINERS = [
  GkFullLayoutComponent,
  GkSimpleLayoutComponent,
];

// Components
import {
  GkLogoComponent,
  GkSidebarWrapperComponent,
  GkSidebarMenuComponent,
  GkHeaderComponent,
  GkBreadcrumbsComponent,
  GkWorkingComponent,
  GkFooterComponent,
} from './components';

const APP_COMPONENTS = [
  GkLogoComponent,
  GkSidebarWrapperComponent,
  GkSidebarMenuComponent,
  GkHeaderComponent,
  GkBreadcrumbsComponent,
  GkWorkingComponent,
  GkFooterComponent,
];

// Directives
import {
  GK_NAV_DROPDOWN_DIRECTIVES,
  GK_SIDEBAR_TOGGLE_DIRECTIVES,
} from './directives';

const APP_DIRECTIVES = [
  GK_NAV_DROPDOWN_DIRECTIVES,
  GK_SIDEBAR_TOGGLE_DIRECTIVES,
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    BaseComponent,
    TrayBaseComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // Scrollbar
    PerfectScrollbarModule,
    SlimLoadingBarModule.forRoot(),
    ScrollToModule.forRoot(),

    // PrimeNg
    ProgressBarModule,
    GrowlModule,
    MessagesModule,
    OverlayPanelModule,
    DropdownModule,

    NgaModule.forRoot(),

    AppRoutingModule,
  ],
  providers: [
    ConfirmationService,
    AppConfig,
    GlobalState,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  exports: [
    SlimLoadingBarModule,
    ProgressBarModule,
    ...APP_DIRECTIVES,
  ]
})
export class AppModule { }
