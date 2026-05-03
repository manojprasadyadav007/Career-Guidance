import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-recent-programs',
  templateUrl: './recent-programs.component.html',
  styleUrls: ['./recent-programs.component.scss']
})
export class RecentProgramsComponent implements OnInit, OnDestroy {

  data: any[];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.recentPrograms().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.data = res;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
