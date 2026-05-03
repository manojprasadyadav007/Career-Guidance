import { Directive, Input, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Directive({
  selector: '[MinValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true}]
})
export class MinValueDirective implements Validator {

  @Input()
  MinValue:number;

  validate(c: FormControl)  {
      return (  this.MinValue!=undefined 
      && this.MinValue!=null && c.value!=undefined && c.value!=null  &&  c.value.toString().length>0 && parseInt(c.value) < this.MinValue)? {"MinValue": true} : null;
  }
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
 
 private _onChange: () => void;

 ngOnChanges(changes: SimpleChanges): void {
    if ('MinValue' in changes) {
      if (this._onChange) this._onChange();
    }
  }


}
