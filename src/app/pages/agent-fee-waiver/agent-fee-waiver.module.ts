import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { AgentFeeWaiverComponent } from './agent-fee-waiver.component';
import { AddAgentFeeWaiverComponent } from './add-agent-fee-waiver/add-agent-fee-waiver.component';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { NumberValidationModule } from 'app/directive/number-validation/number-validation.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
import { RangeValidatorModule } from 'app/directive/custom-validator/range-validator/range-validator.module';
@NgModule({
  declarations: [AgentFeeWaiverComponent, AddAgentFeeWaiverComponent],
  imports: [
    CommonModule, SentenceCaseModule, RangeValidatorModule,
    ComponentsModule, DxDataGridModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, NumberValidationModule,
    RouterModule.forChild([
      { path: '', component: AgentFeeWaiverComponent }
    ])
  ],
  entryComponents: [AddAgentFeeWaiverComponent]
})
export class AgentFeeWaiverModule { }
