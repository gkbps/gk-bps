import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
* @module SafeScriptPipe
* Bypass sanitizing Script due to trust source
*
* How to use:
* <a [click] = " script | safeScript"></a>
*/
@Pipe({
  name: 'safeScript'
})
export class SafeScriptPipe implements PipeTransform  {
  constructor(
    private sanitized: DomSanitizer
  ) {}

  transform(value) {
    // console.log(this.sanitized.bypassSecurityTrustScript(value));
    return this.sanitized.bypassSecurityTrustScript(value);
  }

}
