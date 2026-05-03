import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramSearchDisplayComponent } from './program-search-display.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [ProgramSearchDisplayComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    NgxPaginationModule
  ],
  exports: [ProgramSearchDisplayComponent]
})
export class ProgramSearchDisplayModule { }
