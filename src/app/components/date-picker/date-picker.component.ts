import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { NgForm } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class DatePickerComponent implements OnInit {

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


}
