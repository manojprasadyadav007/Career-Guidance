import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-program-wise-application-chart,[app-program-wise-application-chart]',
  templateUrl: './program-wise-application-chart.component.html',
  styleUrls: ['./program-wise-application-chart.component.scss']
})
export class ProgramWiseApplicationChartComponent implements OnInit, OnDestroy {

  appProgChartData: any;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.programWiseApplicationChart().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.appProgChartData = res;
    });
  }
  customizeLabel(point) {
    return point.argumentText + ': ' + point.percentText ;
  }

  customizeTooltip(point){
    return  point.percentText ;
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
