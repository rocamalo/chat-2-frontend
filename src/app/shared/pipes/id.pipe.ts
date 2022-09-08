import { Pipe, PipeTransform } from '@angular/core';

//PIPE THAT ALLOWS TO DISPLAY ANY DATA THE FORM KEY: VALUE
@Pipe({ name: 'idPipe' })
export class IdPipe implements PipeTransform {
  transform(value: any): any {
    return value === '_id' ? 'id' : value;
  }
}