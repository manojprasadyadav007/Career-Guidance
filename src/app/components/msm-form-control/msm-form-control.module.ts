import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsmFormControlComponent } from './msm-form-control.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule  } from '@angular/material/icon';
import { MatRadioModule  } from '@angular/material/radio';
import { FileUploadModule } from '../file-upload/fiile-upload.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RegisterFormControlModelModule } from 'app/directive/register-form-control-model/register-form-control-model.module';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { RemoveSpacesModule} from 'app/directive/remove-spaces/removespaces.module'
import { AddFormControlComponent } from './add-form-control/add-form-control.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [MsmFormControlComponent, AddFormControlComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MinValueModule,
    MaxValueModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatChipsModule,

    RegisterFormControlModelModule,
    FileUploadModule,
    DatePickerModule,
    RemoveSpacesModule,
    
    
  ],
  exports:[MsmFormControlComponent],
  entryComponents:[AddFormControlComponent]
})
export class MsmFormControlModule { }
