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

 // Scroll to
 import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

 // Toaster
 import { ToastyModule } from 'ngx-toasty';

 // PrimeNg
 /**
  * Growl: (gk-containers)
  * Messages: (gk-containers)
  * Progress bar: Show indefinite loading when interacting with server (gk-containers)
  * Overlay panel: Show HELP overlay panel (gk-breadcrumbs)
  * Dropdown: Show list of working years and legal entities (gk-working)
  * Sidebar:
  */
 import { ScrollPanelModule } from 'primeng/scrollpanel';
 import { ProgressBarModule } from 'primeng/progressbar';
 // import { GrowlModule } from 'primeng/growl';
 import { MessagesModule } from 'primeng/messages';
 import { OverlayPanelModule } from 'primeng/overlaypanel';
 import { DropdownModule } from 'primeng/dropdown';
 import { SidebarModule } from 'primeng/sidebar';

 import { ConfirmationService } from 'primeng/api';

// NGRX STORE
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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

// UTILITIES

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

    // PrimeNg
    ScrollPanelModule,
    ProgressBarModule,
    // GrowlModule,
    MessagesModule,
    OverlayPanelModule,
    DropdownModule,
    SidebarModule,

    ScrollToModule.forRoot(),
    ToastyModule.forRoot(),

    NgaModule.forRoot(),

    // Ngrx Store
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      // Restrict extension to log-only mode
      logOnly: environment.production
    }),

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
