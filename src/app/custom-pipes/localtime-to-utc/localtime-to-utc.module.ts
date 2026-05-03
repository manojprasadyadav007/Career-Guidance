import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaltimeToUtcPipe } from './localtime-to-utc.pipe';

@NgModule({
  declarations: [LocaltimeToUtcPipe],
  imports: [
    CommonModule
  ],
  exports:[
    LocaltimeToUtcPipe
  ]
})
export class LocaltimeToUtcModule { }
