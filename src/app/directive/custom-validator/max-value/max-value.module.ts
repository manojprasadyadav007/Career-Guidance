import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxValueDirective } from './max-value.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MaxValueDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[MaxValueDirective]
})
export class MaxValueModule { }
