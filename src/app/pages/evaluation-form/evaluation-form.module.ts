import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShowEvaluationFormComponent } from './show-evaluation-form/show-evaluation-form.component';
import { EvaluationForm } from './evaluation-form.routing';
import { UtcToLocaltimeModule } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.module';
import { UtcToLocaltimePipe } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.pipe';
import { PrintModule } from '../../pages/print/print.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ShowEvaluationFormComponent,],
  imports: [
    RouterModule.forChild(EvaluationForm),
    SentenceCaseModule,
    CommonModule,
    DxDataGridModule,
    MatIconModule,
    MatButtonModule,
    UtcToLocaltimeModule,
    PrintModule
  ],
  providers: [UtcToLocaltimePipe]
})
export class EvaluationFormModule { }
