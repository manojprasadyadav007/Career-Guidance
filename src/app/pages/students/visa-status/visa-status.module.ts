import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisaStatusShowComponent } from './visa-status-show/visa-status-show.component';
import { VisaStatusAddComponent } from './visa-status-add/visa-status-add.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DatePickerModule } from 'app/components/date-picker/date-picker.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [VisaStatusShowComponent, VisaStatusAddComponent,],
  imports: [
    CommonModule,
    FormsModule,
    SentenceCaseModule,
    DxDataGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,

    DatePickerModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    ConfirmBoxModule,
    RemoveSpacesModule


  ],
  exports: [VisaStatusShowComponent],
  entryComponents: [VisaStatusAddComponent]
})
export class VisaStatusModule { }
