import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionComponent } from './terms-and-condition.component';
import { ComponentsModule } from 'app/components/components.module';
import { ViewTearmAndConditionsComponent } from './view-tearm-and-conditions/view-tearm-and-conditions.component';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [TermsAndConditionComponent, ViewTearmAndConditionsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule
  ],
  exports: [TermsAndConditionComponent],
  entryComponents: [ViewTearmAndConditionsComponent]
})
export class TermsAndConditionModule { }
