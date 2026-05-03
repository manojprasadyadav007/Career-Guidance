import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectNationalityDialogComponent } from './select-nationality-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatButtonModule } from '@angular/material/button';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';



@NgModule({
  declarations: [SelectNationalityDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    TrackByPropertyModule,
    MatButtonModule,
    StringFilterByModule
  ],
  entryComponents:[SelectNationalityDialogComponent]
})
export class SelectNationalityDialogModule { }
