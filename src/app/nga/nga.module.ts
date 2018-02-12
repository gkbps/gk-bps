import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppTranslationModule } from '../app.translation.module';

// DIRECTIVES
import { DisableControlDirective } from './directives';
const NGA_DIRECTIVES = [
  DisableControlDirective
];

// PIPES
// import { } from './pipes';
const NGA_PIPES = [
];

// SERVICES
import {
  APIResultHandlingService,
  ArrayService,
  AuthenticationService,
  AuthGuard,
  BodyBackgroundService,
  ChatService,
  ColorService,
  DashboardService,
  HelpService,
  HelperService,
  HttpClientService,
  // LanguageService,
  LoaderService,
  LocalStorageService,
  MenuService,
  NavigationService,
  ObjectService,
  PaginationService,
  SanitizerByPassService,
  SecurityService,
  SessionService,
  StateManagementService,
  TcodeGuard,
  TcodeService,
  ThemeService,
  UtilsService,
  WebsocketService,
} from './services';

const NGA_SERVICES = [
  APIResultHandlingService,
  ArrayService,
  AuthenticationService,
  AuthGuard,
  BodyBackgroundService,
  ChatService,
  ColorService,
  DashboardService,
  HelpService,
  HelperService,
  HttpClientService,
  // LanguageService,
  LoaderService,
  LocalStorageService,
  MenuService,
  NavigationService,
  ObjectService,
  PaginationService,
  SanitizerByPassService,
  SecurityService,
  SessionService,
  StateManagementService,
  TcodeGuard,
  TcodeService,
  ThemeService,
  UtilsService,
  WebsocketService,
];

// VALIDATORS
import {
  EmailValidator,
  EqualPasswordsValidator,
} from './validators';

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator,
];

@NgModule({
  declarations: [
    // ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES,
    ...NGA_PIPES,
  ],
  imports: [
    CommonModule,
    // RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    AppTranslationModule,

    // ...PRIMENG_MODULES,
  ],
  exports: [
    AppTranslationModule,
    // ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES,
    ...NGA_PIPES,

    // ...PRIMENG_MODULES,
  ],
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        ...NGA_VALIDATORS,
        ...NGA_SERVICES,

        // ...PRIMENG_SERVICES,
      ],
    };
  }
}
