import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { NewsDisplayComponent } from '../news-display/news-display.component';

@Component({
  selector: 'app-news-ticker,[app-news-ticker]',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss']
})
export class NewsTickerComponent implements OnInit, OnDestroy {

  newsList: any[];

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private dashboardService: DashboardService,
    private matDialog:MatDialog) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.dashboardService.news().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.newsList = res;
    });
  }

  view(item:any) {
      this.matDialog.open(NewsDisplayComponent,{data:{title:item.NewsSubject,content:item.NewsDescription},width:'80%'});
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
