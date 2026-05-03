import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import { LeadService } from 'app/services/lead.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap, enumToName, leadSource, leadStatus } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import { StudentService } from 'app/services/student.service';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit ,OnDestroy {


  formdata:any={keyword:''};

  permission:number=0;
  gridMessage: string = 'No data';
  

  currentUser:Login;

  getName=enumToName;

  leadSourceList=leadSource;
  leadStatusList=leadStatus;

  dataList:any[];

  columns:any[]=[
    {
      dataField:'Name',
      title:'Name',
      type:'',
      format:''
    },
    {
      dataField:'MobileNo',
      title:'Mobile Number',
      type:'',
      format:''
    },
    {
      dataField:'Email',
      title:'Email',
      type:'',
      format:''
    },
    {
      dataField:'Country',
      title:'Country',
      type:'',
      format:''
    },
    {
      dataField:'Source',
      title:'Source',
      type:'',
      format:''
    },
    {
      dataField:'Status',
      title:'Status',
      type:'',
      format:''
    },
    {
      dataField:'AgentName',
      title:'Agent',
      type:'',
      format:''
    },
  ];
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private leadService: LeadService,
    private matDialog: MatDialog,
    private router:Router,
    authenticationService:AuthenticationService,
    private studentService:StudentService,
    private toasterService:ToasterService,
    private activityLog: ActivityLogService,) { 
      this.permission =authenticationService.checkPermission(sitemap.Lead);
      this.currentUser = authenticationService.currentUserSubject.getValue();
      this.excel_permisson = authenticationService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
      this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.leadService.list(this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {

      res.forEach((v)=>{
        v.Source = this.getName(this.leadSourceList,v.LeadSource);
        v.Status = this.getName(this.leadStatusList,v.LeadStatus);
      });

       this.dataList=res;
       this.gridMessage = 'No data';
    });
  }

  delete(EventId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.leadService.delete(EventId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.list();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  add() {
     this.router.navigate(['/member/leads/add']);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

  edit(studentId:number)
  {
    this.router.navigate(['/member/leads/edit/'+studentId]);
  }

  onDelete(item)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.studentService.delete(item.StudentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success','Lead deleted successfully');
            this.list();
        });
      }
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Leads', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
