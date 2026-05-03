import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  MAT_DATE_FORMATS } from '@angular/material/core';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-month-year-picker-new',
  templateUrl: './month-year-picker-new.component.html',
  styleUrls: ['./month-year-picker-new.component.scss'],
  providers:[
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class MonthYearPickerNewComponent implements OnInit, OnChanges  {

  env = environment;

  @Input() value: any;
  @Input() placeholder:string; 
  @Input() name:string;
  @Input() required:boolean=false;
  @Input() minDate:Date= this.env.minDate;
  @Input() maxDate:Date= this.env.maxDate;
  @Output() valueChange =new EventEmitter<any>();
  @Input() form:NgForm;
  @Input() hint:string;
  @Input() disabled:boolean=false;


  public valid =false;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange })
  {
      if(changes['minDate'])
      {
         if(this.minDate)
         {
             this.minDate.setDate(1);
         }
      }
  }

  chosenYearHandler(event: moment.Moment) {
    const ctrlValue = event;
    ctrlValue.year(event.year());
   // this.value=ctrlValue;
  }

  chosenMonthHandler(event: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
   
    const ctrlValue = event;
    ctrlValue.month(event.month());
    this.value=ctrlValue;
    datepicker.close();
    this.valueChange.emit( this.value);  
  }

}
