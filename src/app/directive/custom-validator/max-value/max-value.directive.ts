import { Directive, Input, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[MaxValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValueDirective, multi: true}]
})
export class MaxValueDirective implements Validator{

  @Input()
  MaxValue:number;

  validate(c: FormControl): {[key: string]: any} {
    return ( this.MaxValue!=null && this.MaxValue!=undefined &&  parseInt(c.value) > this.MaxValue)? {"MaxValue": true} : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
 
 private _onChange: () => void;

 ngOnChanges(changes: SimpleChanges): void {
    if ('MaxValue' in changes) {
      if (this._onChange) this._onChange();
    }
  }

}
