import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPrecisionDirective } from './decimal-precision.directive';



@NgModule({
  declarations: [DecimalPrecisionDirective],
  imports: [
    CommonModule
  ],
  exports:[DecimalPrecisionDirective]
})
export class DecimalPrecisionModule { }
