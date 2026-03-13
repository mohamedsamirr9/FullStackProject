import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    let result = '';
    for (let i = 0; i < value.length; i++) {
      result += value[i];
      if ((i + 1) % 4 === 0 && i !== value.length - 1) {
        result += ' - ';
      }
    }

    return result;
  }
}
