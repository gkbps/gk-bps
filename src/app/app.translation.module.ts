import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService } from './nga/services';

/**
* @function createTranslateLoader
* A factory to create an address on the fly link to language file
*
* @param {HttpClient} http
*
* @return {url}
*/
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
* @const translationOptions
* Define translation options before hand
*/
const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient],
  },
};

/**
* @module AppTranslationModule
* Define languages available and initialize default language
*/
@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot(translationOptions)
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslateService
  ],
})
export class AppTranslationModule {
  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
  ) {
    translate.addLangs(['en','vn','jp','kr','ch','fr']);
    translate.setDefaultLang('en');

    translate.use(localStorageService.getLang());

    let browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|vn|de/) ? browserLang : 'en');
  }
}
