import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPasswordDirective } from './confirm-password.directive';



@NgModule({
  declarations: [ConfirmPasswordDirective],
  imports: [
    CommonModule
  ],
  exports:[ConfirmPasswordDirective]
})
export class ConfirmPasswordModule { }
