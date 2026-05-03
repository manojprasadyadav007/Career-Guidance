import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';

import { EditCreditCardInfoDialogComponent } from './edit-credit-card-info-dialog.component';
// import { DateTimePickerModule } from 'app/components/date-time-picker/date-time-picker.module';
import { MonthYearPickerModule } from 'app/components/month-year-picker/month-year-picker.module';
import { RemoveSpacesModule} from 'app/directive/remove-spaces/removespaces.module';



@NgModule({
  declarations: [ EditCreditCardInfoDialogComponent ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    RemoveSpacesModule,
    // DatePickerModule,
    MonthYearPickerModule
  ],
  exports: [ EditCreditCardInfoDialogComponent],
  entryComponents: [EditCreditCardInfoDialogComponent]
})
export class EditCreditCardInfoDialogModule { }
