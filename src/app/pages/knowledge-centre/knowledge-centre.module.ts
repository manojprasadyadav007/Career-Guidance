import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeCentreRoutingModule } from './knowledge-centre-routing.module';
import { ShowKnowlegeCentreComponent } from './show-knowlege-centre/show-knowlege-centre.component';
import { AddKnowledgeCentreComponent } from './add-knowledge-centre/add-knowledge-centre.component';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { ComponentsModule } from 'app/components/components.module';
import { DocumentsModule } from './documents/documents.module';
import { UploadDocumentsComponent } from '../students/student-document/upload-documents/upload-documents.component';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { MatSelectModule } from '@angular/material';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ShowKnowlegeCentreComponent, AddKnowledgeCentreComponent, AddCategoryDialogComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule,
    KnowledgeCentreRoutingModule,
    MatSelectModule,
    DocumentsModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    DxHtmlEditorModule,
    DxDataGridModule,
    DxPopupModule,
    DxValidatorModule,
    RemoveSpacesModule
  ],
  entryComponents: [AddKnowledgeCentreComponent, UploadDocumentsComponent, AddCategoryDialogComponent]
})
export class KnowledgeCentreModule { }
