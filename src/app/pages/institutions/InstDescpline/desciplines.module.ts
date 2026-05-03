import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowDesciplinesComponent } from './show-desciplines/show-desciplines.component';
import { AddDesciplinesComponent } from './add-desciplines/add-desciplines.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ShowDesciplinesComponent, AddDesciplinesComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    DxDataGridModule,
    MatSelectModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule
  ],
  exports: [ShowDesciplinesComponent],
  entryComponents: [AddDesciplinesComponent]
})
export class DesciplinesModule { }
