import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseDirective } from './touppercase.directive';



@NgModule({
  declarations: [UpperCaseDirective],
  imports: [
    CommonModule
  ],
  exports: [UpperCaseDirective]
})
export class UpperCaseModule { }
