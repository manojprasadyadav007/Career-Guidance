import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MonthYearPickerNewComponent } from './month-year-picker-new/month-year-picker-new.component';
import { RegisterFormControlModelModule } from 'app/directive/register-form-control-model/register-form-control-model.module';



@NgModule({
  declarations: [MonthYearPickerNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,   
    RegisterFormControlModelModule
  ],
  exports: [ MonthYearPickerNewComponent]
})
export class MonthYearPickerModule { }
