import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentViewLayoutModule } from 'app/pages/student-view-layout/student-view-layout.module';
import { RouterModule } from '@angular/router';
import { DisplayApplicationComponent } from './display-application.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApplicationFeeModule } from '../application-fee/application-fee.module';
import { ActivityModule } from 'app/pages/activity/activity.module';
import { TaskModule } from 'app/pages/task/task.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StudentDocumentModule } from '../../students/student-document/student-document.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatCheckboxModule } from '@angular/material';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { PrintModule } from '../../print/print.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [DisplayApplicationComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    RouterModule.forChild([
      { path: ':id', component: DisplayApplicationComponent },
    ]),

    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,


    StudentViewLayoutModule,
    ApplicationFeeModule,
    ActivityModule,
    TaskModule,
    StudentDocumentModule,
    StringFilterByModule,
    TrackByPropertyModule,
    RemoveSpacesModule,
    PrintModule
  ]
})
export class DisplayApplicationModule { }
