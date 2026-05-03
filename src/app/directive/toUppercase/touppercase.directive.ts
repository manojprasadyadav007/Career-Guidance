import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[toUppercase]'
})
export class UpperCaseDirective {

  constructor(
    private elementRef: ElementRef) { }

    lastValue: string;

    @HostListener('input', ['$event']) onInput(event) {
      const resEventValue = event.target.value.toUpperCase();
      // Avoid max call
      if (!this.lastValue || (this.lastValue && event.target.value.length > 0 && this.lastValue !== event.target.value)) {
        this.lastValue = this.elementRef.nativeElement.value = resEventValue;
        // Propagation
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', false, true);
        event.target.dispatchEvent(evt);
      }
    }
}
