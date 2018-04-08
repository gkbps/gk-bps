import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
* @module SafeResourceURLPipe
* Bypass sanitizing Resource URL due to trust source
*
* How to use:
* <a [href] = " resourceUrl | safeResourceURL"></a>
*/
@Pipe({
  name: 'safeResourceURL'
})
export class SafeResourceURLPipe implements PipeTransform  {
  constructor(
    private sanitized: DomSanitizer
  ) {}

  transform(value) {
    // console.log(this.sanitized.bypassSecurityTrustResourceUrl(value));
    return this.sanitized.bypassSecurityTrustResourceUrl(value);
  }

}
