import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], value: string) {


    return value ? list.filter(item => item.gender === value || item.status === value) : list;
  }

}
