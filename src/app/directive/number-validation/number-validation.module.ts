import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptOnlyNumberDirective } from './accept-onlynumbe.directive';
import { FormsModule } from '@angular/forms';
import { AcceptNumberWithDecimalsDirective } from './accept-numberwithdecimals.directive';
import {TwoDigitDecimaNumberDirective} from './dynamic-validator'

@NgModule({
  declarations: [AcceptOnlyNumberDirective, AcceptNumberWithDecimalsDirective, TwoDigitDecimaNumberDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[AcceptOnlyNumberDirective , AcceptNumberWithDecimalsDirective , TwoDigitDecimaNumberDirective]
})
export class NumberValidationModule { }
