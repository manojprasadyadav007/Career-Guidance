import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionIntakeComponent } from './institution-intake.component';
import { AddInstitutionIntakeComponent } from './add-institution-intake/add-institution-intake.component';
import { DxDataGridModule } from 'devextreme-angular';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule, MatIconModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';
import { RemoveSpacesModule } from '../../../directive/remove-spaces/removespaces.module';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { NumberValidationModule } from 'app/directive/number-validation/number-validation.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [InstitutionIntakeComponent, AddInstitutionIntakeComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    DxDataGridModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonToggleModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    DatePickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MinValueModule,
    MaxValueModule,
    NumberValidationModule,

    RemoveSpacesModule
  ],
  entryComponents: [AddInstitutionIntakeComponent],
  exports: [InstitutionIntakeComponent]
})
export class InstitutionIntakeModule { }
