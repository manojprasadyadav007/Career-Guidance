import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramListingWithFilterComponent } from './program-listing-with-filter.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ComponentsModule } from 'app/components/components.module';
import { ProgramFilterComponent } from './program-filter/program-filter.component';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ProgramListingWithFilterComponent, ProgramListComponent, ProgramFilterComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule
  ],
  exports: [ProgramListingWithFilterComponent, ProgramListComponent]
})
export class ProgramListingWithFilterModule { }
