import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[input, textarea]',
  providers: [NgModel]
})
export class RemoveSpacesDirective {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private ngModel: NgModel) { }


  @HostListener('blur', ['$event']) onKeyPress(event) {

    let value = this.ngModel.model;

    if (value) {
      value = String(value).trim();
      this.renderer.setProperty(
        this.elementRef.nativeElement, 'value', value);
      this.renderer.setAttribute(
        this.elementRef.nativeElement, 'value', value);
      this.ngModel.update.emit(value);
    } else {
      this.renderer.setProperty(
        this.elementRef.nativeElement, 'value', null);
      this.renderer.setAttribute(
        this.elementRef.nativeElement, 'value', null);
      this.ngModel.update.emit('');
    }
  }
}
