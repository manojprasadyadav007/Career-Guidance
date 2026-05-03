import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { DateTimePickerComponent } from './date-time-picker.component';
import { FormsModule} from '@angular/forms';
import { RegisterFormControlModelModule } from 'app/directive/register-form-control-model/register-form-control-model.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [ DateTimePickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    RegisterFormControlModelModule,
    SentenceCaseModule

  ],
  exports: [ DateTimePickerComponent]
})
export class DateTimePickerModule { }
