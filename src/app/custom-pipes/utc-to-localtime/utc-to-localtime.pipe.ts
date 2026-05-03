import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
@Pipe({
  name: 'utcToLocaltime'
})
export class UtcToLocaltimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string,format: string): any {    
    // accepts UTC date as string and returns local date and time based on the provided inut format
    // if(value == null || "undefined"){
    //   return ;
    // }
    if(value == null){return ''}
    let date =  moment.utc(value).toDate();
    // return moment().local().format("YYYY-MMM-DD h:mm A");   
    return  moment(date).format(format);
   // return this.datePipe.transform(new Date(value.replace('Z', '').replace('T', ' ') + ' UTC'),format);   
  }
}
