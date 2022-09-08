import { AbstractControl, ValidationErrors } from "@angular/forms";

export function  matchingFields( field1: string, field2: string) {

    return ( formGroup: AbstractControl): ValidationErrors | null => {
        const password = formGroup.get(field1)?.value;
        const password2 = formGroup.get(field2)?.value;
       if (password !== password2) {
        return {
          notEqual: true
        }
       }
       return null;
    }
  }