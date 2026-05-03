import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CampaignActivityComponent } from './campaign-activity.component';
import { CampaignActivityModule } from './campaign-activity.module';



@NgModule({
  imports: [
    CampaignActivityModule,
    RouterModule.forChild([
      { path: '', component: CampaignActivityComponent, data: { parentType: 9, showagent: 'Agent' }}
    ])]
})
export class CampaignActivityRoutingModule { } 