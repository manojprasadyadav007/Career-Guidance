import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendeComponent } from '../attende/attende.component';
import { AttendeAddComponent } from './attende-add/attende-add.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [AttendeComponent, AttendeAddComponent],
  imports: [
    CommonModule,
    ComponentsModule, DxDataGridModule, NgxMatSelectSearchModule, SentenceCaseModule, StringFilterByModule, TrackByPropertyModule
  ],
  entryComponents: [AttendeAddComponent],
  exports: [AttendeComponent]
})
export class AttendeModule { }
