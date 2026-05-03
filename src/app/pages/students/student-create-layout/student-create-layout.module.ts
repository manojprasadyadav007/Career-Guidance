import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCreateLayoutComponent } from './student-create-layout.component';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';
import { CheckUsernameModule } from 'app/directive/custom-validator/check-username/check-username.module';
import { CheckPassportnoModule } from 'app/directive/custom-validator/check-passportno/check-passportno.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { BackButtonModule } from 'app/directive/back-button/back-button.module';
import { RemoveSpacesModule } from '../../../directive/remove-spaces/removespaces.module';
import { UpperCaseModule } from '../../../directive/toUppercase/touppercase.module'
import { NumberValidationModule } from 'app/directive/number-validation/number-validation.module'
import { MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [StudentCreateLayoutComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,

    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatInputModule,

    BackButtonModule,
    NgxMatSelectSearchModule,
    DatePickerModule,
    CheckUsernameModule,
    CheckPassportnoModule,
    StringFilterByModule,
    TrackByPropertyModule,

    RemoveSpacesModule,
    UpperCaseModule,
    NumberValidationModule
  ],
  exports: [StudentCreateLayoutComponent]
})
export class StudentCreateLayoutModule { }
