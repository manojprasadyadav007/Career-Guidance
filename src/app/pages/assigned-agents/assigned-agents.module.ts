import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignedAgentsRoutingModule } from './assigned-agents-routing.module';
import { AssignedAgentComponent } from './assigned-agent/assigned-agent.component';
import { MatTabsModule, MatChipsModule } from '@angular/material';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxPopupModule } from 'devextreme-angular';
import { DxValidatorModule } from 'devextreme-angular';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatDialogModule, MatMenuModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatOptionModule, MatProgressBarModule, MatPaginatorModule } from '@angular/material';
import { AssignNewAgentComponent } from './assign-new-agent/assign-new-agent.component';
import { DxCheckBoxModule } from "devextreme-angular";
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [AssignedAgentComponent, AssignNewAgentComponent],
  imports: [
    CommonModule, DxCheckBoxModule, SentenceCaseModule,
    FormsModule, ReactiveFormsModule, DxSelectBoxModule,
    MatTabsModule, MatChipsModule, MatMenuModule, DxHtmlEditorModule, DxDataGridModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, DxTooltipModule, DxPopupModule,
    MatIconModule, MatSelectModule,
    AssignedAgentsRoutingModule, DxValidatorModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatDialogModule, MatMenuModule, MatIconModule, MatRadioModule, MatCheckboxModule,
    MatOptionModule, MatProgressBarModule, MatPaginatorModule,
  ],
  entryComponents: [AssignNewAgentComponent]
})
export class AssignedAgentsModule { }
