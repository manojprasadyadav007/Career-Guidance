import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { StudentsSharedModule } from './student-shared.module';
import { ShowStudentsDetailedComponent } from './show-students-detailed/show-students-detailed.component';
import { CampaignActivityModule } from '../campaign/campaign-activity/campaign-activity.module';
import { ActivityModule } from '../activity/activity.module';
import { LeadModule } from '../lead/lead.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { RemoveSpacesModule } from '../../directive/remove-spaces/removespaces.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [ShowStudentsDetailedComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ComponentsModule,
    StudentsSharedModule,
    CampaignActivityModule,
    ActivityModule,
    LeadModule,
    DxDataGridModule,
    SentenceCaseModule,
    RemoveSpacesModule
  ]
})
export class StudentsModule { }
