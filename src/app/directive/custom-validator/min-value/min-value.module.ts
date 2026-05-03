import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinValueDirective } from './min-value.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MinValueDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[MinValueDirective]
})
export class MinValueModule { }
