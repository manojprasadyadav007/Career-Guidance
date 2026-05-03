import { Directive, ElementRef, HostListener, Input, OnInit, forwardRef, SimpleChanges } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator, NgForm } from '@angular/forms';
@Directive({
  selector: '[dynamicNumberValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TwoDigitDecimaNumberDirective),
    multi: true,
  }]
})
export class TwoDigitDecimaNumberDirective implements Validator {
  mindigits: any = 0
  maxdigits: any = 9;
  @Input('zeroAllowed') zeroAllowed: any = 'true';
  @Input('mindecimals') mindecimals: any;
  @Input('maxdecimals') maxdecimals: any;
  @Input('numbertyp') numbertype: any;
  regstring: any;
  validationState = null;
  zeroAllow: any;
  private regex: RegExp;
  constructor(private el: ElementRef) {

  }
  ngOnChanges(changes: SimpleChanges) {

  }
  // registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
  private _onChange: () => void;


  ngOnInit() {
    this.zeroAllow = this.zeroAllowed == 'true' ? '' : '(?!0+$)';
    if (this.numbertype == "numberwithDecimals") {
      this.regstring = `^[${this.mindigits}-${this.maxdigits}]\\.?\\d{${this.mindecimals},${this.maxdecimals}}$`;
    }
    else if (this.numbertype = 'numberiwithOutDecimals') {
      this.regstring = `^${this.zeroAllow}[0-9]{${this.mindecimals},${this.maxdecimals}}$`;
    }
    this.regex = new RegExp(this.regstring, "g");
  }


  validate(c: AbstractControl): { [key: string]: any } {
    let current: string = this.el.nativeElement.value;
    //  const position = this.el.nativeElement.selectionStart;
    if (this.el.nativeElement.value == '') {
      return
    };

    if (current.match(this.regex) != null) {
      this.validationState = null
    } else {
      this.validationState = {
        invalid: true
      }
    }
    return this.validationState;
  }



}