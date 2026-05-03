import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [CountryComponent, AddCountryComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    MatIconModule,
    ConfirmBoxModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    DxDataGridModule
    , NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule
  ],
  exports: [CountryComponent],
  entryComponents: [AddCountryComponent]
})
export class CountryModule { }
