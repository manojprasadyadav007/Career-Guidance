import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormControlModelDirective } from './register-form-control-model.directive';



@NgModule({
  declarations: [RegisterFormControlModelDirective],
  imports: [
    CommonModule
  ],
  exports:[RegisterFormControlModelDirective]
})
export class RegisterFormControlModelModule { }
