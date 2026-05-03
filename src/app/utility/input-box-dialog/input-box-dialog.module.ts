import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBoxDialogComponent } from './input-box-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [InputBoxDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StringFilterByModule,
    TrackByPropertyModule,
    NgxMatSelectSearchModule

  ],
  entryComponents:[InputBoxDialogComponent]
})
export class InputBoxDialogModule { }
