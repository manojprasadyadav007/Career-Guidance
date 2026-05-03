import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDialogModule, MatIconModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddAgentsComponent } from './add-agents.component';
import { AgentRefNewComponent } from '../agent-ref-new/agent-ref-new.component';
import { AssignInstitutionComponent } from '../assign-institution/assign-institution.component';
import { AssignNewInstitutionComponent } from '../assign-institution/assign-new-institution/assign-new-institution.component';
import { AddAgentRefNewComponent } from '../agent-ref-new/add-agent-ref-new/add-agent-ref-new.component';
// import { AssociateInstitutesComponent } from '../associate-institutes/associate-institutes.component';
import { AssociateInstitutesPopupComponent } from '../associate-institutes/associate-institutes-popup/associate-institutes-popup.component';
import { StudentDocumentModule } from 'app/pages/students/student-document/student-document.module';
import { ActivityComponent } from 'app/pages/activity/activity.component';
import { ActivityModule } from 'app/pages/activity/activity.module';
import { AgentApplicationModule } from '../agent-application/agent-application.module';
import { AgreementModule } from 'app/pages/agreement/agreement.module';
import { SharedUserModule } from 'app/pages/users/shared-user/shared-user.module';
import { CampaignActivityModule } from 'app/pages/campaign/campaign-activity/campaign-activity.module';
//import { DisplayDocumentsComponent } from 'app/pages/students/student-document/display-documents/display-documents.component';
import { AgentActivityLogComponent } from '../agent-activity-log/agent-activity-log.component';
import { AgentBranchModule } from '../agent-branch/agent-branch.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [AddAgentsComponent, AgentRefNewComponent, AgentActivityLogComponent,
    AssignInstitutionComponent, AssignNewInstitutionComponent, AddAgentRefNewComponent, AssociateInstitutesPopupComponent],
  imports: [
    CommonModule, SentenceCaseModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule,
    MatMenuModule,
    AgentApplicationModule,
    AgreementModule,
    SharedUserModule,
    CampaignActivityModule,
    MatFormFieldModule,
    ActivityModule,
    FormsModule,
    ComponentsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    AgentBranchModule,
    MatIconModule,
    DxDataGridModule,
    StudentDocumentModule,
  ],
  exports: [AssignInstitutionComponent, AgentActivityLogComponent
    , AssignNewInstitutionComponent, AddAgentsComponent, AddAgentRefNewComponent],
  entryComponents: [AssociateInstitutesPopupComponent, AssignNewInstitutionComponent, AddAgentRefNewComponent, AssignInstitutionComponent]

})
export class AddAgentModule { }
