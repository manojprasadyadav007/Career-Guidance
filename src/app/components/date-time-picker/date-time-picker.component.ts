import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
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
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class DateTimePickerComponent implements OnInit {

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
  @Input() id:string;

  constructor() { }

  ngOnInit() {
  }

}
