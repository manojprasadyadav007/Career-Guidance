import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './sentence-case.pipe';



@NgModule({
  declarations: [SentenceCasePipe],
  imports: [
    CommonModule,

  ],
  exports: [
    SentenceCasePipe
  ]
})
export class SentenceCaseModule { }
