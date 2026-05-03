import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestFormDesignerComponent } from './request-form-designer.component';

import { MatTabsModule, MatChipsModule, MatMenuModule } from '@angular/material';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxPopupModule } from 'devextreme-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { AgreementModule } from 'app/pages/agreement/agreement.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { ComponentsModule } from 'app/components/components.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [
    RequestFormDesignerComponent,
  ],
  imports: [
    CommonModule,
    SentenceCaseModule,
    TrackByPropertyModule,
    ComponentsModule,
    MatTooltipModule,
    MatMenuModule,
    ComponentsModule,
    MatIconModule,
    MatSelectModule,
    DxPopupModule,
    MatTabsModule,
    MatChipsModule,
    AgreementModule,
    DxHtmlEditorModule,
    DxDataGridModule,
    DxTooltipModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,


  ],
  exports: [
    RequestFormDesignerComponent,
  ],
  providers: []
})
export class RequestFormDesignerModule { }
