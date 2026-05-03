import { Directive, Input, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
 

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})
export class ConfirmPasswordDirective implements Validator  {

  @Input()
  appConfirmPassword:string;

  validate(c: FormControl)  {
        if(this.appConfirmPassword == '' && c.value== ''){
          return null;
        }
      return ( c.value != this.appConfirmPassword)? {"ConfirmPassword": true} : null;
  }
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
 
 private _onChange: () => void;

 ngOnChanges(changes: SimpleChanges): void {
    if ('appConfirmPassword' in changes) {
      if (this._onChange) this._onChange();
    }
  }

  constructor() { }

}
