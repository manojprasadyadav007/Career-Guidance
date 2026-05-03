import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { ActivityComponent } from './activity.component';
import { ShowActivityComponent } from './show-activity/show-activity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { ShowTableActivityComponent } from './show-table-activity/show-table-activity.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTemplateModule } from 'devextreme-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [ActivityComponent, ShowActivityComponent, UpdateActivityComponent, ShowTableActivityComponent],
  imports: [
    CommonModule,
    ComponentsModule, DxDataGridModule, SentenceCaseModule, DxTemplateModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    RemoveSpacesModule
  ],
  exports: [ActivityComponent, ShowActivityComponent, UpdateActivityComponent]
})
export class ActivityModule { }
