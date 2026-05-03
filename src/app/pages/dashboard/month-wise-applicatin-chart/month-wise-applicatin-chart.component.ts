import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
@Component({
  selector: 'app-month-wise-applicatin-chart,[app-month-wise-applicatin-chart]',
  templateUrl: './month-wise-applicatin-chart.component.html',
  styleUrls: ['./month-wise-applicatin-chart.component.scss']
})
export class MonthWiseApplicatinChartComponent implements OnInit, OnDestroy {


  monthWiseChartData:any;
  customizeTooltip:any;
  currentUser:Login;
  years = [(new Date()).getFullYear()-2,(new Date()).getFullYear()-1,(new Date()).getFullYear()];

  chartdata={year:(new Date()).getFullYear()}
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService:DashboardService,
    private authService: AuthenticationService) {
      this.currentUser = this.authService.currentUserSubject.getValue();
     }

  ngOnInit() {
    this.showMonthApplicationChart();
  }

  
  showMonthApplicationChart()
  {
    this.dashboardService.monthWiseApplicationChart(this.chartdata.year).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        res.forEach((element)=>{
              element.series.forEach(item => {
                element[item.name] = item.value;
              });
        });
      this.monthWiseChartData = res;
   });
  }
  // customizeTooltip(arg){

  // }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
