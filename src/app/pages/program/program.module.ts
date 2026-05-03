import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { AddProgramComponent } from './add-program/add-program.component';
import { ComponentsModule } from 'app/components/components.module';
import { ProgramContactComponent } from './program-contact/program-contact.component';
import { ShowContactComponent } from './program-contact/show-contact/show-contact.component';
import { AddContactComponent } from './program-contact/add-contact/add-contact.component';
import { ShowRequirementComponent } from './program-requirement/show-requirement/show-requirement.component';
import { AddRequirementComponent } from './program-requirement/add-requirement/add-requirement.component';
import { ShowIntekComponent } from './programIntek/show-intek/show-intek.component';
import { AddIntekComponent } from './programIntek/add-intek/add-intek.component';
import { ProgramRequirementComponent } from './program-requirement/program-requirement.component';
import { ShowProgramDocumentComponent } from './program-document/show-program-document/show-program-document.component';
import { AddProgramDocumentComponent } from './program-document/add-program-document/add-program-document.component';
import { MatTabsModule } from '@angular/material';
import { ShowFeeComponent } from './fee-structure/show-fee/show-fee.component';
import { AddFeeComponent } from './fee-structure/add-fee/add-fee.component';
import { ProgramMaterialAddComponent } from './program-material/program-material-add/program-material-add.component';
import { ProgramMaterialShowComponent } from './program-material/program-material-show/program-material-show.component';
import { EventModule } from '../event/event.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

import { DxoExportModule, DxiColumnModule } from 'devextreme-angular/ui/nested';
import { AddEnglishRequirementComponent } from './program-requirement/add-english-requirement/add-english-requirement.component';
import { AddSubjectRequirementComponent } from './program-requirement/add-subject-requirement/add-subject-requirement.component';
import { AddAdditionalRequirementComponent } from './program-requirement/add-additional-requirement/add-additional-requirement.component';
import { ShowProgramMaterialDialogComponent } from './program-material/show-program-material-dialog/show-program-material-dialog.component';
import { ShowProgramContactDialogComponent } from './program-contact/show-program-contact-dialog/show-program-contact-dialog.component';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { ShowProgramModule } from './show-program/show-program.module';
import { UpperCaseModule } from '../../directive/toUppercase/touppercase.module';

import { RemoveSpacesModule } from '../../directive/remove-spaces/removespaces.module';
import { NumberValidationModule } from '../../directive/number-validation/number-validation.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [AddProgramComponent,
    ProgramContactComponent, ShowContactComponent, AddContactComponent,
    ShowRequirementComponent, AddRequirementComponent, ShowIntekComponent, AddIntekComponent,
    ProgramRequirementComponent,
    ShowProgramDocumentComponent,
    AddProgramDocumentComponent,
    ShowFeeComponent,
    AddFeeComponent,
    ProgramMaterialAddComponent,
    ProgramMaterialShowComponent,
    AddEnglishRequirementComponent,
    AddSubjectRequirementComponent,
    AddAdditionalRequirementComponent,
    ShowProgramMaterialDialogComponent,
    ShowProgramContactDialogComponent,
  ],
  entryComponents: [AddContactComponent, AddRequirementComponent, AddIntekComponent, AddProgramDocumentComponent, AddFeeComponent, ProgramMaterialAddComponent,
    AddEnglishRequirementComponent, AddSubjectRequirementComponent,
    AddAdditionalRequirementComponent, ShowProgramMaterialDialogComponent, ShowProgramContactDialogComponent]
  ,
  imports: [
    CommonModule,
    SentenceCaseModule,
    ProgramRoutingModule,
    ShowProgramModule,
    ComponentsModule,
    MatTabsModule,
    EventModule,
    DxDataGridModule,
    DxoExportModule,
    DxPopupModule,
    DxValidatorModule,
    DxHtmlEditorModule,
    DxiColumnModule, TrackByPropertyModule, NgxMatSelectSearchModule, StringFilterByModule,
    UpperCaseModule,
    NumberValidationModule,

    RemoveSpacesModule
  ],
})
export class ProgramModule { }
