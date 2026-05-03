import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentViewLayoutComponent } from './student-view-layout.component';
import { SchoolModule } from '../students/school/school.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MsmFormControlModule } from 'app/components/msm-form-control/msm-form-control.module';
import { StudentDocumentModule } from '../students/student-document/student-document.module';
import { EditGeneralInfoDialogComponent } from './edit-general-info-dialog/edit-general-info-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material';
import { CheckUsernameModule } from 'app/directive/custom-validator/check-username/check-username.module';
import { CheckPassportnoModule } from 'app/directive/custom-validator/check-passportno/check-passportno.module';
import { FormsModule } from '@angular/forms';
import { EditProgramDetailDialogComponent } from './edit-program-detail-dialog/edit-program-detail-dialog.component';
import { EditEducationBackgroundDialogComponent } from './edit-education-background-dialog/edit-education-background-dialog.component';
import { EditCreditCardInfoDialogComponent } from './edit-credit-card-info-dialog/edit-credit-card-info-dialog.component';
import { EditTestScoreDialogComponent } from './edit-test-score-dialog/edit-test-score-dialog.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { DecimalPrecisionModule } from 'app/directive/custom-validator/decimal-precision/decimal-precision.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { EditCreditCardInfoDialogModule } from '../student-view-layout/edit-credit-card-info-dialog/edit-credit-card-info-dialog.module';
import { FileUploadModule } from 'app/components/file-upload/fiile-upload.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { UpperCaseModule } from 'app/directive/toUppercase/touppercase.module';

import { SingleCommaModule } from 'app/directive/singleComma/single-comma.module'
import { RangeValidatorModule } from 'app/directive/custom-validator/range-validator/range-validator.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [StudentViewLayoutComponent, EditGeneralInfoDialogComponent, EditProgramDetailDialogComponent, EditEducationBackgroundDialogComponent, EditTestScoreDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatInputModule,
    SentenceCaseModule,
    NgxMatSelectSearchModule,

    SchoolModule,
    DatePickerModule,
    CheckUsernameModule,
    CheckPassportnoModule,
    MsmFormControlModule,
    StudentDocumentModule,
    StringFilterByModule,
    MinValueModule,
    MaxValueModule,
    DecimalPrecisionModule,
    RangeValidatorModule,
    TrackByPropertyModule,
    EditCreditCardInfoDialogModule,
    FileUploadModule,
    MatTooltipModule,
    RemoveSpacesModule,
    UpperCaseModule,

    SingleCommaModule
  ],
  exports: [StudentViewLayoutComponent],
  entryComponents: [EditGeneralInfoDialogComponent, EditProgramDetailDialogComponent, EditEducationBackgroundDialogComponent, EditTestScoreDialogComponent]
})
export class StudentViewLayoutModule { }
