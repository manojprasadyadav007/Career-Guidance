import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-recent-applications',
  templateUrl: './recent-applications.component.html',
  styleUrls: ['./recent-applications.component.scss']
})
export class RecentApplicationsComponent implements OnInit, OnDestroy {

  data:any[];
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {
    this.dashboardService.recentApplications().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.data=res;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
