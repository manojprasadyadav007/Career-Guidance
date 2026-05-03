import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../news/news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { LocaltimeToUtcModule } from 'app/custom-pipes/localtime-to-utc/localtime-to-utc.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';




@NgModule({
  declarations: [NewsComponent, AddNewsComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    DxHtmlEditorModule,
    RouterModule.forChild([
      { path: '', component: NewsComponent },
    ]),
    DxDataGridModule,
    DxPopupModule,
    DxValidatorModule,
    LocaltimeToUtcModule,
    RemoveSpacesModule
  ],
  entryComponents: [AddNewsComponent]
})
export class NewsModule { }
