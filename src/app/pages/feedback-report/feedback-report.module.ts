import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackReportComponent } from './feedback-report.component';
import { DxDataGridModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';




@NgModule({
  declarations: [FeedbackReportComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    MatIconModule, MatButtonModule,
    RouterModule.forChild([
      { path: '', component: FeedbackReportComponent },
    ]),
  ]
})
export class FeedbackReportModule { }
