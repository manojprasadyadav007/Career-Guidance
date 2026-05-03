import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCommaPipe } from './single-comma.directive';



@NgModule({
  declarations: [SingleCommaPipe],
  imports: [
    CommonModule
  ],
  exports: [SingleCommaPipe]
})
export class SingleCommaModule { }
