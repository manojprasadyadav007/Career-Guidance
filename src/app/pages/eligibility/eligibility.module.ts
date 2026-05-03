import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EligibilityRoutingModule } from './eligibility-routing.module';
import { CheckEligibilityComponent } from './check-eligibility/check-eligibility.component';
import { SearchStudentModule } from '../search-student/search-student.module';
import { ProgramSearchDisplayModule } from '../program-search-display/program-search-display.module';
import { ProgramFilterDisplayModule } from '../program-filter-display/program-filter-display.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { MatListModule } from '@angular/material/list';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { UpperCaseModule } from '../../directive/toUppercase/touppercase.module';
import { NumberValidationModule } from '../../directive/number-validation/number-validation.module';
import { RemoveSpacesModule } from '../../directive/remove-spaces/removespaces.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [CheckEligibilityComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    EligibilityRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatOptionModule,
    MinValueModule,
    MaxValueModule,
    MatListModule,
    SearchStudentModule,
    ProgramSearchDisplayModule,
    ProgramFilterDisplayModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,

    NumberValidationModule,
    UpperCaseModule,
    RemoveSpacesModule
  ],
})
export class EligibilityModule { }
