import { Directive, Input, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[rangeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RangeValidatorDirective,
    multi: true
  }]
})
export class RangeValidatorDirective implements Validator {

  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() allowEmpty?: boolean = false;
  
  private _onChange: () => void;

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if(!this.allowEmpty) {
      if (control.value && +control.value > this.maxValue && this.maxValue !== null) {
        return { 'maxValueInvalid': true };
      }
      if (control.value && +control.value < this.minValue && this.minValue !== null) {
        return { 'minValueInvalid': true };
      }
      return null;
    } else {
      if(control.value === '' || control.value === null) {
        return null;
      } else {
        if (control.value && +control.value > this.maxValue && this.maxValue !== null) {
          return { 'maxValueInvalid': true };
        }
        if (control.value && +control.value < this.minValue && this.minValue !== null) {
          return { 'minValueInvalid': true };
        }
        return null;
      }
    }
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  ngOnChanges(changes: SimpleChanges): void {
    if ('maxValue' in changes || 'minValue' in changes) {
      if (this._onChange) this._onChange();
    }
  }

}
