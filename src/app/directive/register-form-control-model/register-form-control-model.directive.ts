import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Directive({
  selector: '[appRegisterFormControlModel]'
})
export class RegisterFormControlModelDirective implements OnInit {

  private el: HTMLInputElement;

  @Input('appRegisterFormControlModel') public form: NgForm;
  @Input('registerModel') public model: NgModel;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    if (this.form && this.model) {
      this.form.form.registerControl(this.model.name, this.model.control);
      this.form.addControl(this.model);
    }
  }

}
