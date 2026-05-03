import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeValidatorDirective } from './range-validator.directive';



@NgModule({
  declarations: [RangeValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [RangeValidatorDirective]
})
export class RangeValidatorModule { }
