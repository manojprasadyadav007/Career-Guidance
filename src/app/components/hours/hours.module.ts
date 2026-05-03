import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursComponent } from './hours.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ HoursComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MinValueModule,
    FormsModule
  ],
  exports: [HoursComponent]
})
export class HoursModule { }
