import { Directive, HostListener  , Input} from '@angular/core';
@Directive({
  selector: '[appAcceptOnlyNumber]',
})
export class AcceptOnlyNumberDirective {

  constructor() { }
  @Input('appAcceptOnlyNumber') value: string;

  @HostListener('keypress', ['$event']) 
  onKeyDown(e) {
      var k;  
        k = e.keyCode;
         //         k = event.keyCode;  (Both can be used)
        return( (k >= 48 && k <= 57)); 
   
  }
}
