import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckPassportNoDirective } from './check-passportno.directive';



@NgModule({
  declarations: [CheckPassportNoDirective],
  imports: [
    CommonModule
  ],
  exports:[CheckPassportNoDirective]
})
export class CheckPassportnoModule { }
