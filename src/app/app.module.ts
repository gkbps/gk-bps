/**
 * ANGULAR MODULES
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/**
 * 3RD PARTY - DATABASE
 * Apollo GraphQL
 * Ngrx Store
 */

import { GraphQLModule } from './apollo/graphql.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/**
 * 3RD PARTY - UI
 * ScrollTo
 * Toaster
 * PrimeNg
 * - ScrollPanel:     Menu scroll
 * - Progress bar:    Indefinite progress to show data loading (gk-containers)
 * - Overlay panel:   Context based HELP (gk-breadcrumbs)
 * - Dropdown:        List of working years and legal entities (gk-working)
 * - Sidebar:         Potential for other purposes
 */

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ToastyModule } from 'ngx-toasty';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';

import { ConfirmationService } from 'primeng/api';

 /**
  * 3RD PARTY - UTILITIES
  * Translate
  */

import { TranslateService } from '@ngx-translate/core';

/**
 * GK MODULES & COMPONENTS
 * App level component, base standard components, routing
 * Global services
 * App level UI
 * - Containers
 * - Components
 * - Directives
 */
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

    // Apollo
    GraphQLModule,

    // Ngrx Store
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production // Restrict extension to log-only mode
    }),

    ScrollToModule.forRoot(),
    ToastyModule.forRoot(),

    // PrimeNg
    ScrollPanelModule,
    ProgressBarModule,
    // GrowlModule,
    // MessagesModule,
    OverlayPanelModule,
    DropdownModule,
    SidebarModule,

    // GK
    NgaModule.forRoot(),

    AppRoutingModule,
  ],
  providers: [
    ConfirmationService,
    AppConfig,
    GlobalState,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  exports: [
    ScrollPanelModule,
    ProgressBarModule,
    ToastyModule,
    ...APP_DIRECTIVES,
  ]
})
export class AppModule { }
