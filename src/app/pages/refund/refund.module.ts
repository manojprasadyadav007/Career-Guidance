import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowRefundComponent } from './show-refund/show-refund.component';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { ViewRefundDocumentsComponent } from './view-refund-documents/view-refund-documents.component';
import { StudentDocumentModule } from '../students/student-document/student-document.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [ShowRefundComponent, ViewRefundDocumentsComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    RouterModule.forChild([
      { path: '', component: ShowRefundComponent },
    ]),
    DxTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    StudentDocumentModule,
  ],
  entryComponents: [ViewRefundDocumentsComponent]
})
export class RefundModule { }
