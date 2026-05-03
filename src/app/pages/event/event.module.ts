import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventShowComponent } from './event-show/event-show.component';
import { EventAddComponent } from './event-add/event-add.component';
import { ComponentsModule } from 'app/components/components.module';
import { MatTabsModule } from '@angular/material';
import { AttendeModule } from '../attende/attende.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [EventShowComponent, EventAddComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule,
    MatTabsModule,
    AttendeModule,
    DxHtmlEditorModule,
    DxPopupModule,
    DxValidatorModule,
    DxDataGridModule, NgxMatSelectSearchModule, TrackByPropertyModule, StringFilterByModule
  ],
  entryComponents: [EventAddComponent],
  exports: [EventShowComponent],

})
export class EventModule { }
