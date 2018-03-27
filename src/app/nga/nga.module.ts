import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppTranslationModule } from '../app.translation.module';

/**
* NGA contains global accessible module to
* - Directives
* - Pipes
* - Services
* - Validators
*
* NGA components are independent and include on the demand
*/

// DIRECTIVES
import {
  DebounceClickDirective,
  DisableControlDirective
} from './directives';

const NGA_DIRECTIVES = [
  DebounceClickDirective,
  DisableControlDirective
];

// PIPES
import {
 SafeHTMLPipe,
 SafeResourceURLPipe,
 SafeScriptPipe,
 SafeStylePipe,
 SafeURLPipe
} from './pipes';

const NGA_PIPES = [
  SafeHTMLPipe,
  SafeResourceURLPipe,
  SafeScriptPipe,
  SafeStylePipe,
  SafeURLPipe
];

// SERVICES
import {
  APIResultHandlingService,
  ArrayService,
  AuthGuard,
  AuthenticationService,
  BodyBackgroundService,
  ChatService,
  ColorService,
  DashboardHelperService,
  FileService,
  HelpService,
  HelperService,
  HttpClientService,
  LanguageService,
  LoaderService,
  LocalStorageService,
  MenuService,
  NavigationService,
  ObjectService,
  PaginationService,
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
  AuthGuard,
  AuthenticationService,
  BodyBackgroundService,
  ChatService,
  ColorService,
  DashboardHelperService,
  FileService,
  HelpService,
  HelperService,
  HttpClientService,
  LanguageService,
  LoaderService,
  LocalStorageService,
  MenuService,
  NavigationService,
  ObjectService,
  PaginationService,
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
