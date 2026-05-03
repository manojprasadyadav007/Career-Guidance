import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementComponent } from '../agreement/agreement.component';
import { AddAgreementComponent } from './add-agreement/add-agreement.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { ShowNotificationComponent } from './show-notification/show-notification.component';
import { DxDataGridModule, DxValidatorModule } from 'devextreme-angular';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatMenuModule } from '@angular/material/menu';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [AgreementComponent, AddAgreementComponent, ShowNotificationComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    DxHtmlEditorModule,
    DxPopupModule,
    DxValidatorModule,
    MatMenuModule,
    DxDataGridModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
  ],
  entryComponents: [AddAgreementComponent, ShowNotificationComponent],
  exports: [AgreementComponent]
})
export class AgreementModule { }
