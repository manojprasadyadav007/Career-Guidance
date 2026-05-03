import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringFilterByPipe } from './string-filter-by.pipe';
import { stringFilterforMultiByPipe } from './string-filter-forgroup-by';

@NgModule({
  declarations: [StringFilterByPipe, stringFilterforMultiByPipe],
  imports: [
    CommonModule
  ],
  exports:[StringFilterByPipe, stringFilterforMultiByPipe]
})
export class StringFilterByModule { }
