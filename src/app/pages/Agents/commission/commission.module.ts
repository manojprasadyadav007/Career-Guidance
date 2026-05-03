import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCommissionComponent } from './add-commission/add-commission.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatInputModule } from '@angular/material/input';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { ShowCommissionComponent } from './show-commission/show-commission.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';


import { RangeValidatorModule } from 'app/directive/custom-validator/range-validator/range-validator.module';
import { NumberValidationModule } from 'app/directive/number-validation/number-validation.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [AddCommissionComponent, ShowCommissionComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShowCommissionComponent },
      { path: ':id', component: ShowCommissionComponent },
    ]),

    DxDataGridModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    MatInputModule,

    StringFilterByModule,
    TrackByPropertyModule,
    DxHtmlEditorModule,
    DxPopupModule,
    MinValueModule,
    MaxValueModule,
    DxValidatorModule,
    RemoveSpacesModule,
    MatCheckboxModule,
    DatePickerModule,
    NumberValidationModule,
    RangeValidatorModule

  ],
  entryComponents: [AddCommissionComponent]
})
export class CommissionModule { }
