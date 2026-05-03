import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAgentApplicationComponent } from './show-agent-application/show-agent-application.component';
import { AddAgentApplicationComponent } from './add-agent-application/add-agent-application.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { ReasoningDialogboxModule } from 'app/utility/reasoning-dialogbox/reasoning-dialogbox.module';
import { NumberValidationModule } from '../../../directive/number-validation/number-validation.module';
import { RemoveSpacesModule } from '../../../directive/remove-spaces/removespaces.module';
import { UpperCaseModule } from '../../../directive/toUppercase/touppercase.module';
import { DocumentsModule } from 'app/pages/knowledge-centre/documents/documents.module';
import { PrintModule } from '../../print/print.module'
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [ShowAgentApplicationComponent, AddAgentApplicationComponent,
    GeneratePdfComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule, DxDataGridModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    ReasoningDialogboxModule,
    NumberValidationModule,
    DocumentsModule,
    RemoveSpacesModule,
    UpperCaseModule,
    PrintModule
  ],
  exports: [ShowAgentApplicationComponent, AddAgentApplicationComponent,
    GeneratePdfComponent]
})
export class AgentApplicationModule { }
