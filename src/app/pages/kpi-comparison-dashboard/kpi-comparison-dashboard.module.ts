import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KpiComparisonDashboardRoutingModule } from './kpi-comparison-dashboard-routing.module';
import { KpiComparisonDashboardComponent } from './kpi-comparison-dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { KpiComparisonSubReportDialogComponent } from './kpi-comparison-sub-report-dialog/kpi-comparison-sub-report-dialog.component';
import { KpiDashboardComponent } from './kpi-dashboard/kpi-dashboard.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DxoExportModule, DxiColumnModule } from 'devextreme-angular/ui/nested';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { DxPivotGridFieldChooserModule } from 'devextreme-angular/ui/pivot-grid-field-chooser';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { ComponentsModule } from 'app/components/components.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [KpiComparisonDashboardComponent, KpiComparisonSubReportDialogComponent, KpiDashboardComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,

    DxDataGridModule,
    DxPivotGridModule,
    DxPivotGridFieldChooserModule,
    DxoExportModule,
    DxiColumnModule,
    DxChartModule,
    ComponentsModule,
    KpiComparisonDashboardRoutingModule
  ],
  entryComponents: [KpiComparisonSubReportDialogComponent]
})
export class KpiComparisonDashboardModule { }
