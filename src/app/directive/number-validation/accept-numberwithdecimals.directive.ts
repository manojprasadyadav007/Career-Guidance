import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAcceptNumberWithDecimals]'
})
export class AcceptNumberWithDecimalsDirective {


  constructor(private el: ElementRef) { }
  @Input('appAcceptNumberWithDecimals') decimalValue: number;


  @HostListener('keypress', ['$event'])

  onKeyDown(e) {
    let k;
    let val = this.decimalValue ? this.decimalValue : 2;
    k = e.keyCode;
    if (k == 8 || k == 37) {
      return true;
    } else if (k == 46 && this.el.nativeElement.value.indexOf('.') != -1) {
      return false;
    } else if (k > 31 && k != 46 && (k < 48 || k > 57)) {
      return false;
    }
    if (this.el.nativeElement.value.indexOf('.') != -1) {
      let decimalLength = this.el.nativeElement.value.split('.');

      if (decimalLength[1].length > val) {
        {
          return false;
        }
      }
    }
    return true;

  }
  // @HostListener('blur', ['$event'])
  // onBlur(e){
  //   let  val = this.decimalValue ? this.decimalValue : 2;
  //   if(this.el.nativeElement.value.indexOf('.') != -1){
  //     this.el.nativeElement.value =  parseFloat(this.el.nativeElement.value).toFixed(val).toString();
  //      }
  // }
  // @HostListener('keyup', ['$event'])

  // onKeyUp(e){
  //   let  val = this.decimalValue ? this.decimalValue : 2;
  //   if(this.el.nativeElement.value.indexOf('.') != -1){
  //    let decimalLength =  this.el.nativeElement.value.split('.');
  //   //  console.log(decimalLength);
  //     if(decimalLength[1].length > val-1){
  //       console.log(decimalLength[1].length);
  //     //  return false;
  //        this.el.nativeElement.value =  parseFloat(this.el.nativeElement.value).toFixed(val).toString();
  //       // console.log(this.el.nativeElement.value);

  //     }
  //     // this.el.nativeElement.value =  parseFloat(this.el.nativeElement.value).toFixed(val).toString();
  //      }
  // }


}
