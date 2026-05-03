import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignActivityComponent } from './campaign-activity.component';
import { CampaignActivityAddComponent } from './campaign-activity-add/campaign-activity-add.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [CampaignActivityComponent, CampaignActivityAddComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    DxHtmlEditorModule,
    DxPopupModule,
    DxValidatorModule,
    DxDataGridModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule
  ],
  exports: [CampaignActivityComponent],
  entryComponents: [CampaignActivityAddComponent]
})
export class CampaignActivityModule { }
