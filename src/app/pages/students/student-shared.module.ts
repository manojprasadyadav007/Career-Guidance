import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentsComponent } from './add-students/add-students.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule, MatTabsModule } from '@angular/material';
import { TermsAndConditionModule } from '../terms-and-condition/terms-and-condition.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { StudentCreateLayoutModule } from './student-create-layout/student-create-layout.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [AddStudentsComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    MatCheckboxModule,
    ComponentsModule,
    RouterModule,
    MatTabsModule,
    TermsAndConditionModule,
    DxDataGridModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    StudentCreateLayoutModule,
    TrackByPropertyModule
  ],
  exports: [AddStudentsComponent],
})
export class StudentsSharedModule { }
