import { TitleCasePipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputTitleCase]'
})
export class InputTitleCaseDirective {

  constructor(private elementRef: ElementRef,
    private titlecasePipe:TitleCasePipe) { }
 
  lastValue: string;

  @HostListener('input', ['$event']) onInput(event) {
    const resEventValue = this.transformName(event.target.value);
    // Avoid max call
   
    if (!this.lastValue || (this.lastValue && event.target.value.length > 0 && this.lastValue !== event.target.value)) {
      this.lastValue = this.elementRef.nativeElement.value = resEventValue;
    }
  
}
transformName(title){
  return this.titlecasePipe.transform(title);
}
}
