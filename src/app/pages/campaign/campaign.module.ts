import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { ComponentsModule } from 'app/components/components.module';
import { CampaignAddComponent } from './campaign-add/campaign-add.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { AttendeModule } from '../attende/attende.module';
import { EventModule } from '../event/event.module';
import { TaskModule } from '../task/task.module';
import { CampaignMaterialComponent } from './campaign-material/campaign-material.component';
import { CampaignActivityModule } from './campaign-activity/campaign-activity.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { BackButtonModule } from 'app/directive/back-button/back-button.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { NumberValidationModule } from 'app/directive/number-validation/number-validation.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [CampaignComponent, CampaignAddComponent, CampaignMaterialComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: CampaignComponent },
      { path: 'add', component: CampaignAddComponent },
      { path: 'edit/:id', component: CampaignAddComponent },
    ]),
    MatTabsModule,
    AttendeModule,
    EventModule,
    TaskModule,
    NumberValidationModule,
    CampaignActivityModule,
    DxDataGridModule, StringFilterByModule, NgxMatSelectSearchModule, TrackByPropertyModule, BackButtonModule, RemoveSpacesModule
  ]
})
export class CampaignModule { }
