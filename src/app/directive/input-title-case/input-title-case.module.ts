import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { InputTitleCaseDirective } from './input-title-case.directive';



@NgModule({
  declarations: [InputTitleCaseDirective],
  imports: [
    CommonModule
  ],
  exports: [InputTitleCaseDirective],
  providers : [TitleCasePipe]
})
export class InputTitleCaseModule { }
