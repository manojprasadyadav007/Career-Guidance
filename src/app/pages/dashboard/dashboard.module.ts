import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilesComponent } from './tiles/tiles.component';
import { MyToDoComponent } from './my-to-do/my-to-do.component';
import { EventModule } from '../event/event.module';
import { TaskModule } from '../task/task.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from 'app/components/components.module';
import { RecentProgramsComponent } from './recent-programs/recent-programs.component';
import { RecentApplicationsComponent } from './recent-applications/recent-applications.component';
import { ProgramUpdatesComponent } from './program-updates/program-updates.component';
import { ProgramWiseApplicationChartComponent } from './program-wise-application-chart/program-wise-application-chart.component';
import { MonthWiseApplicatinChartComponent } from './month-wise-applicatin-chart/month-wise-applicatin-chart.component';
import { LayoutItemDirective } from './layout-item.directive';
import { NewsTickerComponent } from './news-ticker/news-ticker.component';
import { NewsDisplayComponent } from './news-display/news-display.component';
import { RouterModule } from '@angular/router';
import { NewTilesComponent } from './new-tiles/new-tiles.component';
import { TaskDisplayComponent } from './task-display/task-display.component';
import { DxDataGridModule, DxChartModule, DxFunnelModule } from 'devextreme-angular';
import { tooltip } from '../dashboard/dashboard-tooltip.module';
import { ProgramNewsUpdatesModule } from './program-news-updates/program-news-updates.module';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { DxRadioGroupModule, DxTemplateModule } from 'devextreme-angular';

import { ApplicationIntakeChartComponent } from './application-intake-chart/application-intake-chart.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MarketActivityChartComponent } from './market-activity-chart/market-activity-chart.component';
import { UtcToLocaltimeModule } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.module';
import { InstituteDashboardComponent } from './institute-dashboard/institute-dashboard.component';
import { NewInstitutionTilesComponent } from './new-institution-tiles/new-institution-tiles.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CountryMapComponent } from './country-map/country-map.component';
import { DashboardTaskDisplayComponent } from './dashboard-task-display/dashboard-task-display.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { StudentApplicationGrowthComponent } from './student-application-growth/student-application-growth.component';
import { ActionableAlertsComponent } from './actionable-alerts/actionable-alerts.component';
import { ProgramHighestApplicationComponent } from './program-highest-application/program-highest-application.component';
import { StatusWiseApplicationCountDisplayComponent } from './status-wise-application-count-display/status-wise-application-count-display.component';
import { StudentGrowthDialogComponent } from './student-growth-dialog/student-growth-dialog.component';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
import { InputTitleCaseModule } from 'app/directive/input-title-case/input-title-case.module';

@NgModule({
  declarations: [TilesComponent, MyToDoComponent, AdminDashboardComponent, StudentDashboardComponent, AgentDashboardComponent,
    DashboardComponent, RecentProgramsComponent, RecentApplicationsComponent, ProgramUpdatesComponent, ProgramWiseApplicationChartComponent,
    MonthWiseApplicatinChartComponent, LayoutItemDirective, NewsTickerComponent, NewsDisplayComponent,
    NewTilesComponent, TaskDisplayComponent, ApplicationIntakeChartComponent, MarketActivityChartComponent,
    InstituteDashboardComponent, NewInstitutionTilesComponent, CountryMapComponent, DashboardTaskDisplayComponent, ApplicationListComponent, StudentApplicationGrowthComponent, ActionableAlertsComponent,
    ProgramHighestApplicationComponent,
    StatusWiseApplicationCountDisplayComponent,
    StudentGrowthDialogComponent,

  ],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    EventModule,
    TaskModule,
    DxChartModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ]),
    DxFunnelModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxTemplateModule,
    DxRadioGroupModule,
    DxDataGridModule, tooltip,
    ProgramNewsUpdatesModule,
    UtcToLocaltimeModule,
    NgxPaginationModule,
    InputTitleCaseModule
  ],
  providers: [SentenceCasePipe],
  exports: [DashboardComponent],
  entryComponents: [TilesComponent, MyToDoComponent, MonthWiseApplicatinChartComponent,
    ProgramWiseApplicationChartComponent, NewsDisplayComponent, StudentGrowthDialogComponent]
})
export class DashboardModule { }
