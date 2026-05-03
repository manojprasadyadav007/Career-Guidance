import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtcToLocaltimePipe } from './utc-to-localtime.pipe';

@NgModule({
  declarations: [UtcToLocaltimePipe],
  imports: [
    CommonModule
  ],
  exports:[
    UtcToLocaltimePipe
  ]
})
export class UtcToLocaltimeModule { }
