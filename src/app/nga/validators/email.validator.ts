import { AbstractControl } from '@angular/forms';

/**
* @module EmailValidator
* Validate if email
*
* @function validate
*/
export class EmailValidator {

  /**
  * @function validate
  * Validate if a control contain correct email formatted information
  *
  * @param {AbstractControl} c
  *
  * @return {boolean}
  */
  public static validate(c: AbstractControl) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false,
      }
    };
  }

}
