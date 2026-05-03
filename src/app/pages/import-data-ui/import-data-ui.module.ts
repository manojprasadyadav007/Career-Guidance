import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportDataUiComponent } from './import-data-ui.component';
import { ComponentsModule } from 'app/components/components.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [ImportDataUiComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '**', component: ImportDataUiComponent }
    ]),
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule
  ]
})
export class ImportDataUiModule { }
