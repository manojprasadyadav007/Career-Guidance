import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDocumentComponent } from './student-document.component';
import { ComponentsModule } from 'app/components/components.module';
import { DisplayDocumentsComponent } from './display-documents/display-documents.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DisplayDocumentsLocalComponent } from './display-documents-local/display-documents-local.component';
import { UtcToLocaltimeModule } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.module';
import { UtcToLocaltimePipe } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { MyDocumentViewComponent } from './my-document-view/my-document-view.component';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [StudentDocumentComponent, DisplayDocumentsComponent, DisplayDocumentsLocalComponent, MyDocumentViewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DxDataGridModule,
    MatIconModule,
    MatButtonModule,
    UtcToLocaltimeModule,
    MatMenuModule,
    DxPopupModule,
    SentenceCaseModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule
  ],
  exports: [StudentDocumentComponent, DisplayDocumentsComponent, DisplayDocumentsLocalComponent],
  providers: [UtcToLocaltimePipe],
  entryComponents: [MyDocumentViewComponent]
})
export class StudentDocumentModule { }
