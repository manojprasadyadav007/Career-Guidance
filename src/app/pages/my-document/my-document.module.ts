import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDocumentComponent } from '../my-document/my-document.component';
import { RouterModule } from '@angular/router';
import { StudentDocumentModule } from 'app/pages/students/student-document/student-document.module'
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [MyDocumentComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    StudentDocumentModule,
    RouterModule.forChild([
      { path: '', component: MyDocumentComponent },
    ]),
  ]
})
export class MyDocumentModule { }
