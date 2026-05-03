import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationFeeAddComponent } from './application-fee-add/application-fee-add.component';
import { ApplicationFeeShowComponent } from './application-fee-show/application-fee-show.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';
import { FileUploadModule } from 'app/components/file-upload/fiile-upload.module';
import { FormsModule } from '@angular/forms';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { EditCreditCardInfoDialogModule } from '../../student-view-layout/edit-credit-card-info-dialog/edit-credit-card-info-dialog.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';




@NgModule({
  declarations: [ApplicationFeeAddComponent,
    ApplicationFeeShowComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    DxDataGridModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    NgxMatSelectSearchModule,


    DatePickerModule,
    FileUploadModule,
    MinValueModule,
    StringFilterByModule,
    TrackByPropertyModule,

    EditCreditCardInfoDialogModule

  ],
  exports: [ApplicationFeeShowComponent],
  entryComponents: [ApplicationFeeAddComponent]
})
export class ApplicationFeeModule { }
