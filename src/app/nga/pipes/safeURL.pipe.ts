import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
* @module SafeURL
* Bypass sanitizing URL due to trust source
*
* How to use:
* <a [routerLink] = "url | safeURL"></a>
*/
@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform  {
  constructor(
    private sanitized: DomSanitizer
  ) {}

  transform(value) {
    // console.log(this.sanitized.bypassSecurityTrustUrl(value));
    return this.sanitized.bypassSecurityTrustUrl(value);
  }

}
