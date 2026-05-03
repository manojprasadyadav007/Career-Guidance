import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserNotificationService } from 'app/services/user-notification.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit,OnDestroy {

  gridMessage: string = 'No data';

  dataList: any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  columns: any[];

  showFilterRow: boolean = false;
  excel_permisson: number = 0;
  constructor(
    authService: AuthenticationService,
    private activityLog: ActivityLogService,
    private userNotificationService: UserNotificationService,
   private router:Router
    ) {
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.userNotificationService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res.data;
     
      let index= res.columns.findIndex(d=>d==='Url');
      res.columns.splice(index,1);
      this.columns=res.columns;
      this.gridMessage = 'No data';
    });
  }

  activitylog() {
    this.activityLog.activitylog(0, 'UserNotifications', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onRowClick(data:any)
  {
       this.router.navigate([data.Url],{queryParams:{notification:true}});
  }

}
