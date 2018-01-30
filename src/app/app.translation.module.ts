import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { LocalStorageService } from './nga/services';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient],
  },
};

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
