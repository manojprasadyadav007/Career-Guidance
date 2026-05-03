import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AgreementService } from 'app/services/agreement.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.scss']
})
export class ShowNotificationComponent implements OnInit , OnDestroy{

  private onDestroy$: Subject<void> = new Subject<void>();
  dataList:any[];
  columns:any[] = [
    {
      dataField:'NotificationDetail',
      title:'Activity',
      type:'',
      format:''
    },
    {
      dataField:'perform_by',
      title:'Update By',
      type:'',
      format:''
    },
    {
      dataField:'AddStamp',
      title:'Activity Time',
      type:'date',
      format:'dd MMM yyyy'
    },
  ];

  requestid:string;
  showFilterRow:boolean=false;
  excel_permisson: number = 0;
  gridMessage: string = 'No data';
  constructor(  private agreementService: AgreementService,
    @Inject(MAT_DIALOG_DATA) data,
    authService : AuthenticationService
   ) { 
      this.requestid = data.requestid;
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
   }

  ngOnInit() {
    this.gridMessage = 'Loading';
    this.agreementService.notificationList(this.requestid).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{this.dataList=res;
      this.gridMessage = 'No data';
    });
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
