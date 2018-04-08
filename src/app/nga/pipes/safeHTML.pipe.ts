import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
* @module SafeHTMLPipe
* Bypass sanitizing HTML due to trust source
*
* How to use:
* <div [innerHtml]="html | safeHtml"></div>
*/
@Pipe({
  name: 'safeHTML'
})
export class SafeHTMLPipe implements PipeTransform  {
  constructor(
    private sanitized: DomSanitizer
  ) {}

  transform(value) {
    // console.log(this.sanitized.bypassSecurityTrustHtml(value));
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
