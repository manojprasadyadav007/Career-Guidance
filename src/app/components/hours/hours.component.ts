import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HoursComponent),
      multi: true
    }]
  })
export class HoursComponent implements OnInit, ControlValueAccessor {

  @Input()
  placeholder:string='Hours'

  @Input() required:boolean=false;
  
  @Input() disabled:boolean=false;

  @Input()
  name: string;

  @Input('value')
  val: string;

  @Input()
  minHours:number=0;

  @Input()
  form:NgForm

  hours=[
    '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  ]
  
  
  constructor() { }

  ngOnInit() {
  }

  onChange: any = () => { };
  onTouched: any = () => { 
    
  };

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { 
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }


}
