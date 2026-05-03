import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
//import { AgentSharedModule } from '../Agents/agent-shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DisplayStudentModule } from '../students/display-student/display-student.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { AddAgentModule } from '../Agents/add-agents/add-agents.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ProfileComponent, UserProfileComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    AddAgentModule,
    ComponentsModule,
    DisplayStudentModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent },
    ]),
  ]
})
export class ProfileModule { }
