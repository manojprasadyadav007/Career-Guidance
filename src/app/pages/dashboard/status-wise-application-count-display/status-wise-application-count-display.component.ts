import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-status-wise-application-count-display',
  templateUrl: './status-wise-application-count-display.component.html',
  styleUrls: ['./status-wise-application-count-display.component.scss'],
})
export class StatusWiseApplicationCountDisplayComponent  implements OnInit , OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();
  inTakeList: any[] = [];
  applicationStatusIntakeItem:number = 0;
  applicationStatusItem = ''
  
    applicationStatusLength;
    applicationStatusWiseApplicationCount: any[];
   
  constructor(private institutionIntakeService: InstitutionIntakeService,
    private dashboardService: DashboardService) { 
     
    }

  ngOnInit() {
    this.institutionIntakeService.ForDashboardFilter(0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      const intakeData = res;
      if (intakeData && intakeData.length > 0) {
        this.inTakeList = intakeData;
        this.applicationStatusIntakeItem = intakeData[0].IntakeGroupId;
        this.applicationStatusForIntake(this.applicationStatusIntakeItem);
      }
    });
   
  }

  applicationStatusForIntake(intakeName) {

    this.dashboardService.ApplicationStatusWiseApplicationCount(intakeName)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        const applicationStatusData = res;
        this.applicationStatusLength = applicationStatusData.length;
        if (applicationStatusData && applicationStatusData.length > 0) {
          this.applicationStatusWiseApplicationCount = applicationStatusData;
        }
      });
  }

    /* Pie Chart Starts */
    pointClickHandler(e) {
      this.toggleVisibility(e.target);
    }
  
    legendClickHandler(e) {
      const arg = e.target,
        item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
      this.toggleVisibility(item);
    }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }
}

