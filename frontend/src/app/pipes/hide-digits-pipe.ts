import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideDigits',
})
export class HideDigitsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const visibleDigits = 4;
    const hiddenLength = value.length - visibleDigits;
    let result = '';
    for (let i = 0; i < value.length; i++) {
      if (i < hiddenLength) {
        result += '*';
      } else {
        result += value[i];
      }
      if ((i + 1) % 4 === 0 && i !== value.length - 1) {
        result += ' - ';
      }
    }

    return result;
  }
}
