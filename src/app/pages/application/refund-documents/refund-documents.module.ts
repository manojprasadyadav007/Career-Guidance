import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundDocumentsComponent } from './refund-documents.component';
import { StudentDocumentModule } from 'app/pages/students/student-document/student-document.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentDocumentModule,
    SentenceCaseModule,
    MatDialogModule
  ],
  entryComponents: []
})
export class RefundDocumentsModule { }
