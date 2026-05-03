import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstitutionsComponent } from './add-institutions.component';
import { RequestFormDesignerComponent } from '../request-form-designer/request-form-designer.component';
import { ApplicationFormAdditionalFieldComponent } from '../application-form-additional-field/application-form-additional-field.component';
import { CampusModule } from '../campus/campus.module';
import { CountryModule } from '../country/country.module';
import { DesciplinesModule } from '../InstDescpline/desciplines.module';
import { InstitutionAgentsModule } from '../institution-agents/institution-agents.module';
import { InstitutionMaterialModule } from '../instituteion-material/institution-material.module';
import { InstitutionTeamModule } from '../institution-team/institution-team.module';
import { InstitutionIntakeModule } from '../institution-intake/institution-intake.module';
import { ApplicationFlowModule } from '../application-flow/application-flow.module';
import { GroupVisibilityModule } from '../group-visibility/group-visibility.module';
import { InstitutionDocumentModule } from '../institution-document/institution-document.module';
import { SharedUserModule } from 'app/pages/users/shared-user/shared-user.module';
import { EventModule } from 'app/pages/event/event.module';
import { AgreementModule } from 'app/pages/agreement/agreement.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { NumberValidationModule } from 'app/directive/number-validation/number-validation.module';
import { UpperCaseModule } from 'app/directive/toUppercase/touppercase.module';
import { UtcToLocaltimePipe } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.pipe';
import { RouterModule } from '@angular/router';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DxDataGridModule, DxHtmlEditorModule, DxPopupModule, DxTooltipModule } from 'devextreme-angular';
import { MatChipsModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [
    AddInstitutionsComponent,
    RequestFormDesignerComponent,
    ApplicationFormAdditionalFieldComponent
  ],
  imports: [
    CommonModule,
    SentenceCaseModule,
    CampusModule,
    CountryModule,
    DesciplinesModule,
    InstitutionAgentsModule,
    InstitutionMaterialModule,
    InstitutionTeamModule,
    InstitutionIntakeModule,
    ApplicationFlowModule,
    GroupVisibilityModule,
    SharedUserModule,
    InstitutionDocumentModule,
    EventModule,
    AgreementModule,
    RemoveSpacesModule,
    NumberValidationModule,
    UpperCaseModule,
    MatMenuModule,
    ComponentsModule,
    MatIconModule,
    MatSelectModule,
    DxPopupModule,
    MatTabsModule,
    MatChipsModule,
    DxHtmlEditorModule,
    DxDataGridModule,
    DxTooltipModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    RouterModule.forChild([
      { path: '', component: AddInstitutionsComponent },
      { path: ':id', component: AddInstitutionsComponent },
    ]),
  ],
  exports: [AddInstitutionsComponent,
    RequestFormDesignerComponent,
    ApplicationFormAdditionalFieldComponent
  ],
  providers: [UtcToLocaltimePipe]
})
export class AddInstitutionsModule { }
