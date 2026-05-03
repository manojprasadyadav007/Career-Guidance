import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationFlowComponent } from './application-flow.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ClickToEditModule } from 'app/components/click-to-edit/click-to-edit.module';
import { AddStatusDialogComponent } from '../add-status-dialog/add-status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ApplicationFlowComponent, AddStatusDialogComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    ClickToEditModule,
    MatIconModule,
    MatSelectModule,
    DragDropModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    MatDialogModule,
    DxDataGridModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RemoveSpacesModule
  ],
  exports: [ApplicationFlowComponent],
  entryComponents: [AddStatusDialogComponent]
})
export class ApplicationFlowModule { }
