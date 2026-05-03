import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayStudentComponent } from './display-student.component';
import { StudentViewLayoutModule } from 'app/pages/student-view-layout/student-view-layout.module';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { VisaStatusModule } from '../visa-status/visa-status.module';
import { InterestModule } from 'app/pages/lead/interest/interest.module';
import { CampaignActivityModule } from 'app/pages/campaign/campaign-activity/campaign-activity.module';
import { ActivityModule } from 'app/pages/activity/activity.module';
import { ShowStudentApplicationModule } from '../show-student-application/show-student-application.module';



@NgModule({
  declarations: [DisplayStudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: DisplayStudentComponent },
    ]),

    MatExpansionModule,

    StudentViewLayoutModule,
    VisaStatusModule,
    InterestModule,
    CampaignActivityModule,
    ActivityModule,
    ShowStudentApplicationModule
  ],
  exports: [DisplayStudentComponent]
})
export class DisplayStudentModule { }
