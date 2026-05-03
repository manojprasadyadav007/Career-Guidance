import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingReportsComponent } from './marketing-reports/marketing-reports.component';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxoExportModule, DxiColumnModule } from 'devextreme-angular/ui/nested';
import { MatIconModule } from '@angular/material/icon';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { ComponentsModule } from 'app/components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { Role, RoleType } from 'app/models/site-map.model';
import { DxPivotGridFieldChooserModule } from 'devextreme-angular/ui/pivot-grid-field-chooser';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [MarketingReportsComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    DxiColumnModule,
    DxoExportModule,
    MatIconModule,
    DxPivotGridModule,
    MatButtonModule,
    ComponentsModule,
    DxPivotGridFieldChooserModule,
    DxChartModule,


    RouterModule.forChild([
      { path: 'master', component: MarketingReportsComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      //{ path: 'marketingmanager-master', component: MarketingReportsComponent,canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]}},
      { path: 'calling', component: MarketingReportsComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
      { path: 'studentsfollowup', component: MarketingReportsComponent, canActivate: [RoleAuthGuard], data: { disallowedRole: [Role.Student] } },
    ]),

  ]
})
export class MarketingReportsModule { }
