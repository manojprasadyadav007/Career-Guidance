import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ShowAgentsComponent } from './show-agents/show-agents.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {
//   MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatDialogModule, MatMenuModule, MatIconModule, MatRadioModule, MatCheckboxModule,
//   MatOptionModule, MatProgressBarModule, MatPaginatorModule
// } from '@angular/material';
// import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { AgentRoutes } from './agents.routing';
// import { AgentSharedModule } from './agent-shared.module';
// import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
// import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
// import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
// import { DxPopupModule } from 'devextreme-angular/ui/popup';
// import { DxValidatorModule } from 'devextreme-angular';
// import { RemoveSpacesModule } from '../../directive/remove-spaces/removespaces.module';
// import { NumberValidationModule } from '../../directive/number-validation/number-validation.module';
// import { UpperCaseModule } from '../../directive/toUppercase/touppercase.module';
// import { ShowMultidataOnhoverModule } from 'app/directive/show-multiselectdata-onhover/show-multidata-onhover.module';


@NgModule({
  imports: [
    RouterModule.forChild(AgentRoutes),
    SentenceCaseModule,
    //    CommonModule,
    //     FormsModule,
    //     ReactiveFormsModule,
    //     MatButtonModule,
    //     MatFormFieldModule,
    //     MatInputModule,
    //     MatSelectModule,
    //     MatTableModule,
    //     MatDialogModule,
    //     MatMenuModule,
    //     MatIconModule,
    //     MatRadioModule,
    //     MatCheckboxModule,
    //     MatOptionModule,
    //     MatProgressBarModule,
    //     MatPaginatorModule,
    //     ComponentsModule,
    // //    AgentSharedModule,
    //     DxDataGridModule,
    //     DxPopupModule,
    //     DxValidatorModule,
    //     DxHtmlEditorModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    //     RemoveSpacesModule,
    //    // ShowMultidataOnhoverModule,
    //     NumberValidationModule,
    //     UpperCaseModule
  ],
  declarations: [],
})
export class AgentsModule { }
