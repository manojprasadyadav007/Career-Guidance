import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampusComponent } from './campus.component';
import { AddCampusComponent } from './add-campus/add-campus.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule, MatChipsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module';
import { RemoveSpacesModule } from '../../../directive/remove-spaces/removespaces.module';
import { MatMenuModule } from '@angular/material/menu';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [CampusComponent, AddCampusComponent,],
  imports: [
    FormsModule,
    ConfirmBoxModule,
    SentenceCaseModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    DxPopupModule,
    MatTabsModule,
    MatChipsModule,
    DragDropModule,
    MatMenuModule,
    DxDataGridModule, DxTooltipModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,

    RemoveSpacesModule
  ],
  exports: [CampusComponent, AddCampusComponent],
  entryComponents: [ConfirmBoxComponent, AddCampusComponent]
})
export class CampusModule { }
