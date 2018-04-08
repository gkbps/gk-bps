import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
* @module SafeStylePipe
* Bypass sanitizing Style due to trust source
*
* How to use:
* <div [style] =  "style | safeScript"></div>
*/
@Pipe({
  name: 'safeStyle'
})
export class SafeStylePipe implements PipeTransform  {
  constructor(
    private sanitized: DomSanitizer
  ) {}

  transform(value) {
    // console.log(this.sanitized.bypassSecurityTrustStyle(value));
    return this.sanitized.bypassSecurityTrustStyle(value);
  }

}
