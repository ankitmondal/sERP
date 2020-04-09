import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'split',
})
export class SplitPipe  implements PipeTransform {
  transform(val:string, params:string):string {
    let words= val.split(params);
    if(words.length >= 1) {
      return words[0];
    } else {
      return '';
    }
  }
}
