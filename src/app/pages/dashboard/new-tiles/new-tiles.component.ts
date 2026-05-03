import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-new-tiles,[app-new-tiles]',
  templateUrl: './new-tiles.component.html',
  styleUrls: ['./new-tiles.component.scss']
})
export class NewTilesComponent implements OnInit, OnDestroy {

  data: any[];
  tile1: any;


  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.getDashboardTiles(1);
  }

  selectedValue(duration: number) {
    this.getDashboardTiles(duration);
  }

  getDashboardTiles(duration: number) {
    this.dashboardService.tiles(duration)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.data = res;
        if (this.data && this.data.length > 0) {
          this.tile1 = this.data[0];
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
