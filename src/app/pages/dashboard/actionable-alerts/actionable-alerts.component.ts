import { Component, OnInit , OnDestroy } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-actionable-alerts',
  templateUrl: './actionable-alerts.component.html',
  styleUrls: ['./actionable-alerts.component.scss'],
})
export class ActionableAlertsComponent implements OnInit , OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();
   
  actionableAlerts: any[];
     
    actionableAlertsColumns: any[] = [
      { dataField: 'SNo', title: 'S NO', type: '', format: '' },
      { dataField: 'IntakeName', title: 'Intake', type: '', format: '' },
      { dataField: 'FirstName', title: 'First name', type: '', format: '' },
      { dataField: 'LastName', title: 'Last name', type: '', format: '' },
      { dataField: 'DateOfBirth', title: 'Date of birth', type: "date", format: 'dd MMM yyyy' },
      { dataField: 'ProgramName', title: 'Program', type: '', format: '' },
      { dataField: 'CurrentStatus', title: 'Current status', type: '', format: '' },
      { dataField: 'ActionToBePerformed', title: 'Action to be performed', type: '', format: '' },
      { dataField: 'PendingSince', title: 'Pending since ', type: '', format: '' },
    ];
  constructor( 
    private dashboardService: DashboardService) { 
     
    }

  ngOnInit() {
    this.dashboardService.ActionableAlerts()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      const actionAlertData = res;
      if (actionAlertData && actionAlertData.length > 0) {
        this.actionableAlerts = actionAlertData;
      }
    });
  }
 
 

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

   
}
