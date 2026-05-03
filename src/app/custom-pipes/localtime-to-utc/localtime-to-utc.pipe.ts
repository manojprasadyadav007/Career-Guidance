import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localtimeToUtc'
})
export class LocaltimeToUtcPipe implements PipeTransform {
  // accepts the moment date object OR js date Object OR a string as date 
  // along with varaible time and converts it to UTC date and time 
  transform(value: any, time: string): any {
    return new Date(moment(value).format('YYYY-MM-DD') + ' ' + time).toISOString();
  }
}
