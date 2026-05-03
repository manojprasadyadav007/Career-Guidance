import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDialogModule, MatIconModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StudentDocumentModule } from 'app/pages/students/student-document/student-document.module';
import { AgentBranchModule } from '../agent-branch/agent-branch.module';
import { ShowAgentsComponent } from './show-agents.component';
import { DxiColumnModule, DxoExportModule } from 'devextreme-angular/ui/nested';
import { SentenceCasePipe } from '../../../custom-pipes/sentence-case/sentence-case.pipe';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
//import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';


@NgModule({
  declarations: [ShowAgentsComponent],
  imports: [
    SentenceCaseModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    MatTabsModule,
    DxDataGridModule,
    DxoExportModule,
    DxiColumnModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    MatTooltipModule,
    ComponentsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    AgentBranchModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: ShowAgentsComponent }
    ]),
    DxDataGridModule,
    StudentDocumentModule
  ],
  exports: [ShowAgentsComponent],
  entryComponents: []

})
export class ShowAgentModule { }
