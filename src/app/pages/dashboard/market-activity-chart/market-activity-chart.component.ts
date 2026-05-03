import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from 'app/services/dashboard.service';
import { takeUntil } from 'rxjs/operators';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-market-activity-chart',
  templateUrl: './market-activity-chart.component.html',
  styleUrls: ['./market-activity-chart.component.scss']
})
export class MarketActivityChartComponent implements OnInit {

  inTakeList: any = [];
  intakeitem: any='';
  appFilter: string = '';
  monthWiseChartData: any;
  // customizeTooltip:any;

  institutionId:number=0;
  currentUser:Login;
   
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private Dashboardservice: DashboardService,
    private authService:AuthenticationService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
   }

  ngOnInit() {
    if(this.currentUser.RoleType===2)
    {
      this.institutionId = this.currentUser.RefId;
    }
   // this.getIntakeList();
    this.showMonthApplicationChart();
  }

  // dropdown data 
  getIntakeList() {
    this.Dashboardservice.intakeForMarketingActivity(this.institutionId)
    .pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.inTakeList = res;
      this.intakeitem = this.inTakeList.length > 0 ? this.inTakeList[0].IntakeName : null;
    });
  }

  // chart data 
  showMonthApplicationChart() {
    this.Dashboardservice.marketingActivity( this.intakeitem,this.institutionId)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.monthWiseChartData = res;
      });
  }

  // get chart data upon intake change
  changeIntake() {
    this.showMonthApplicationChart();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
