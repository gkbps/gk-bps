import { FormGroup } from '@angular/forms';

/**
* @module EqualPasswordsValidator
* Validate if password and retyped password are the same
*
* @function validate
*/
export class EqualPasswordsValidator {

  /**
  * @function validate
  * Validate if password and retyped password are the same
  *
  * @param {string} firstField
  * @param {string} secondField
  *
  * @return {boolean}
  */
  public static validate(firstField, secondField) {

    return (c: FormGroup) => {

      return (c.controls && c.controls[firstField].value === c.controls[secondField].value) ? null : {
        passwordsEqual: {
          valid: false,
        }
      };
    };
  }

}
