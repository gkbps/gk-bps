import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class SanitizerByPassService {

  constructor(
    private domSanitizer: DomSanitizer,
  ) {
  }

  sanitizerByPassHtml(html) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  sanitizerByPassScript(script) {
    return this.domSanitizer.bypassSecurityTrustScript(script);
  }

  sanitizerByPassStyle(style) {
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  sanitizerByPassUrl(url) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizerByPassResourceUrl(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
