import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursControlComponent } from './hours-control.component';



@NgModule({
  declarations: [ HoursControlComponent],
  imports: [
    CommonModule
  ],
  exports: [HoursControlComponent]
})
export class HoursControlModule { }
