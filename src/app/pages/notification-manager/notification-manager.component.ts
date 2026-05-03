import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Login } from 'app/models/login.model';
import { NotificationManagerService } from 'app/services/notification-manager.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { AddNotificationManagerComponent } from './add-notification-manager/add-notification-manager.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent implements OnInit , OnDestroy {

  // dataList:MatTableDataSource<any>;
  // columnToDisplay: string[] = [ 'Subject','Sender','Region', 'Institution','Schedule','Enabled','Action'];
  
  gridMessage: string = 'No data';
  
  dataList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  columns:any[]=[
    { dataField:'SubjectLine', title:'Subject', type:'', format:'' },
    { dataField:'SenderName', title:'Sender', type:'', format:'' },
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'Institution', title:'Institution', type:'', format:'' },
    { dataField:'SendSchedule', title:'Schedule', type:'', format:'' },
    { dataField:'PartnerTypeName', title:'Partner Type', type:'', format:'' }
  ];

    showFilterRow:boolean=false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  currentUser:Login;

  permission:number=0;
  excel_permisson: number = 0;


  constructor(private notificationService:NotificationManagerService,
    private matDialog:MatDialog,
    private toasterService: ToasterService,
    private authService:AuthenticationService,
    private activityLog: ActivityLogService,) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.permission = authService.checkPermission(sitemap.NotificationManager);
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    this.list();
  }

  add(notificationId?:number)
  {
      this.matDialog.open(AddNotificationManagerComponent,{data:{
        NotificationId:notificationId
      },width:'70%'}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res)
        {
          this.list();
        }
      })
  }

  delete(notificationId:number)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.notificationService.delete(notificationId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Notification deleted successfully");
            this.list();
        });
      }
    });
  }
  getSenderSchedule = ((item: number) =>{
    switch (item){
      case 0:{
       return  "Every Month";
        break;}
      case 1:{
       return  "Every Week";
        break;}
      case 2:{
        return  "Every Day";
        break;}
  }
});

  list()
  {
    this.gridMessage = 'Loading';
    this.notificationService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      res.forEach((item) =>{
          item.SendSchedule = this.getSenderSchedule(item.SendSchedule);
      });
      this.dataList = res;
      this.gridMessage = 'No data';
     // this.dataList = new MatTableDataSource(res);
     //  this.dataList.paginator=this.paginator;
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Notifications', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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

}
