import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadStudentAppLayoutComponent } from './upload-student-app-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { FileUploadModule } from 'app/components/file-upload/fiile-upload.module';
import { MatButtonModule, MatFormFieldModule, MatOptionModule } from '@angular/material';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [UploadStudentAppLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    SentenceCaseModule,
    TrackByPropertyModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    FileUploadModule,
    RouterModule.forChild([
      { path: '', component: UploadStudentAppLayoutComponent }
    ])
  ]
})
export class UploadStudentAppLayoutModule { }
