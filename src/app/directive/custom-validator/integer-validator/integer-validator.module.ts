import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegerValidatorDirective } from './integer-validator.directive';



@NgModule({
  declarations: [IntegerValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [IntegerValidatorDirective]
})
export class IntegerValidatorModule { }
