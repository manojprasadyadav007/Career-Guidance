import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { DisplayProgramComponent } from './display-program/display-program.component';
import { ProgramListingWithFilterModule } from '../program-listing-with-filter/program-listing-with-filter.module';
import { RouterModule } from '@angular/router';
import { ProgramSearchDisplayModule } from '../program-search-display/program-search-display.module';
import { ProgramFilterDisplayModule } from '../program-filter-display/program-filter-display.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [DisplayProgramComponent],
  imports: [
    CommonModule, SentenceCaseModule,
    ComponentsModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    RouterModule.forChild([
      { path: '', component: DisplayProgramComponent }
    ]),
    ProgramSearchDisplayModule,
    ProgramFilterDisplayModule, MatAutocompleteModule, RemoveSpacesModule
  ],
  exports: [DisplayProgramComponent]
})
export class SearchProgramModule { }
