import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestAddComponent } from './interest-add/interest-add.component';
import { InterestComponent } from './interest.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [InterestComponent, InterestAddComponent,],
  imports: [
    CommonModule, SentenceCaseModule,
    ComponentsModule, DxDataGridModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule
  ],
  exports: [InterestComponent],
  entryComponents: [InterestAddComponent]
})
export class InterestModule { }
