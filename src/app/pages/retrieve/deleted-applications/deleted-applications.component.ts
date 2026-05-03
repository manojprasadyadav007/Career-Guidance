import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Login } from 'app/models/login.model';
import { RetrieveService } from 'app/services/retrieve.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { sitemap } from 'app/models/site-map.model';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-deleted-applications',
  templateUrl: './deleted-applications.component.html',
  styleUrls: ['./deleted-applications.component.scss']
})
export class DeletedApplicationsComponent implements OnInit , OnDestroy {

  formdata: any = { keyword: '' };
  gridMessage: string = 'No data';
  currentUser: Login;
  permission: number = 0;

  dataList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  columns:any[]=[
    {
      dataField:'PassportNo',
      title:'Passport Number',
      type:'',
      format:''
    },
    {
      dataField:'StudentId',
      title:'Student ID',
      type:'',
      format:''
    },
    {
      dataField:'FirstName',
      title:'First Name',
      type:'',
      format:''
    },
    {
      dataField:'LastName',
      title:'Last Name',
      type:'',
      format:''
    },
    {
      dataField:'InstName',
      title:'Institution',
      type:'',
      format:''
    },
    {
      dataField:'ProgramName',
      title:'Program',
      type:'',
      format:''
    },
    {
      dataField:'IntekDate',
      title:'Intake',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'AddStamp',
      title:'Application Date',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'ApplicationStatus',
      title:'Status',
      type:'',
      format:''
    },
    {
      dataField:'DeleteStamp',
      title:'Delete Date',
      type:'date',
      format:'dd MMM yyyy'
    },
  ];
  showFilterRow:boolean=false;
  excel_permisson: number = 0;

  constructor(private retrieveService: RetrieveService,
    private authService: AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private router: Router,
    private activityLog: ActivityLogService,) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.RetrieveApplication);

    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }

    this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.retrieveService.listApplication(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList=res;
        this.gridMessage = 'No data';
    });
  }

  retrieve(deleteId:number,aplicationId: number) {
    this.matDialog.open(ConfirmBoxComponent,{data:{content:'Are you sure want to retrieve this application?'}}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.retrieveService.retrieve(deleteId,aplicationId,'Application').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success','Application retrieved successfully');
            this.list();
        });
      }
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Retrieve Deleted Application', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
