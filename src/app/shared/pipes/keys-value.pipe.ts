import { Pipe, PipeTransform } from '@angular/core';

//PIPE THAT ALLOWS TO DISPLAY ANY DATA THE FORM KEY: VALUE
@Pipe({ name: 'keysValue' })
export class KeysValuePipe implements PipeTransform {
  transform(value: any): any {
    if(!value) return null;
    return Object.keys(value);
  }
}