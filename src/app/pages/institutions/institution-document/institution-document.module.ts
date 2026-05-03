import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionDocumentRoutingModule } from './institution-document-routing.module';
import { InstitutionDocumentComponent } from './institution-document.component';
import { AddInstitutionDocumentComponent } from './add-institution-document/add-institution-document.component';
import { DxDataGridModule } from 'devextreme-angular';
import { MatButtonToggleModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { FormsModule } from '@angular/forms';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [InstitutionDocumentComponent, AddInstitutionDocumentComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatButtonToggleModule,
    StringFilterByModule,
    TrackByPropertyModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  entryComponents: [AddInstitutionDocumentComponent],
  exports: [InstitutionDocumentComponent]
})
export class InstitutionDocumentModule { }
