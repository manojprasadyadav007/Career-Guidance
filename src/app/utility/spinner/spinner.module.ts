import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';





@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule, 
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports: [SpinnerComponent]
})
export class SpinnerModule { }
