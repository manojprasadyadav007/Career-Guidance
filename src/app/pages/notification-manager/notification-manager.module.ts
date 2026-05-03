import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationManagerComponent } from './notification-manager.component';
import { AddNotificationManagerComponent } from './add-notification-manager/add-notification-manager.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { DxHtmlEditorModule, DxPopupModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [NotificationManagerComponent, AddNotificationManagerComponent,],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule,
    DxHtmlEditorModule,
    DxPopupModule, DxDataGridModule,
    RouterModule.forChild([
      {
        path: '', component: NotificationManagerComponent
      }
    ]),
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    RemoveSpacesModule
  ],
  entryComponents: [AddNotificationManagerComponent]
})
export class NotificationManagerModule { }
