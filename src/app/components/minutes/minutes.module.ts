import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinutesComponent } from './minutes.component';
import {  MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule} from '@angular/forms';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';


@NgModule({
  declarations: [ MinutesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,

    MinValueModule
  ],
  exports: [MinutesComponent]
})
export class MinutesModule { }
