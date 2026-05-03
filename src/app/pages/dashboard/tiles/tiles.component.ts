import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-tiles,[app-tiles]',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit, OnDestroy {

  data: any[];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.tiles(1).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.data = res;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
