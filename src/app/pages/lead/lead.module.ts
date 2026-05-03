import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadComponent } from '../lead/lead.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { ActivityModule } from '../activity/activity.module';
import { CampaignActivityModule } from '../campaign/campaign-activity/campaign-activity.module';
import { InterestModule } from './interest/interest.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { VisaStatusModule } from '../students/visa-status/visa-status.module';
import { LeadCreateComponent } from './lead-create/lead-create.component';
import { LeadDisplayComponent } from './lead-display/lead-display.component';
import { StudentViewLayoutModule } from '../student-view-layout/student-view-layout.module';
import { StudentCreateLayoutModule } from '../students/student-create-layout/student-create-layout.module';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import { Role } from 'app/models/site-map.model'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [LeadComponent,
    LeadCreateComponent, LeadDisplayComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    MatTabsModule,
    ActivityModule,
    CampaignActivityModule,
    InterestModule,
    RouterModule.forChild([
      { path: '', component: LeadComponent },
      { path: 'add', component: LeadCreateComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student, Role.Institute] } },
      { path: 'edit/:id', component: LeadDisplayComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student, Role.Institute] } },
    ]),
    DxDataGridModule,
    VisaStatusModule,

    StudentViewLayoutModule,
    StudentCreateLayoutModule
  ],

})
export class LeadModule { }
