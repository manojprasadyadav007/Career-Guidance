import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { AdvanceReportComponent } from './advance-report.component';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { PassportExpiryReportComponent } from './passport-expiry-report/passport-expiry-report.component';
import { DxoExportModule, DxiColumnModule } from 'devextreme-angular/ui/nested';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { DxPivotGridFieldChooserModule } from 'devextreme-angular/ui/pivot-grid-field-chooser';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DisplayReportComponent } from './display-report/display-report.component';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { Role, RoleType } from 'app/models/site-map.model';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [AdvanceReportComponent, PassportExpiryReportComponent, DisplayReportComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxPivotGridFieldChooserModule,
    DxoExportModule,
    DxiColumnModule,
    DxChartModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    SentenceCaseModule,

    RouterModule.forChild([
      {
        path: 'passport-expiry', component: PassportExpiryReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] }
      },
      {
        path: 'mobility', loadChildren: () => import('./show-map/show-map.module').then(m => m.ShowMapModule), canActivate: [RoleAuthGuard], data: { allowedRoleType: [RoleType.MSMTeam] }
      },
      // {
      //   path: 'weekly-dashboard', component: AdvanceReportComponent
      // },
      { path: 'daily-sales', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'programwise', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'new-application', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'deferred-application', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'arrival-application', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'refundtracker', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agentinvoicetracker', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'growth-analysis', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'student-analysis', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'daily-sales-with-revenue', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agent-refund-tracker', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'conversion-ratio', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'commission-tracker', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'aef-data', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agentintakewisesummary', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'institutecountrywisesummary', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'instituteintakewisesummary', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agentinstitutionintakewisesummary', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agentinstituteintakewiseperformance', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'instituteagentgrowth', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'institutetoptenprogram', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'pendingofferlettercanada', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'pendingofferletteruk', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'summaryofrefund', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'salesreportcanada', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'salesreportusa', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'salesreportuk', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'salesreporthungary', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'aefmissingdata', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agent-activity', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'useractivity', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'agent-zone-wise', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'marketingactivity', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'toptenagentperformance', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'commission-report', component: AdvanceReportComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
    ]),
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule

  ]
})
export class AdvanceReportModule { }
