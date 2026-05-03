import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { MSMAgentService } from 'app/services/msmagent.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-agents',
  templateUrl: './show-agents.component.html',
  styleUrls: ['./show-agents.component.scss']
})
export class ShowAgentsComponent implements OnInit, OnDestroy {

  //columnToDisplay: string[] = ["CompanyName", 'LegalName', 'Website','Status' ,'Contact',  'Action'];
  //agentList: MatTableDataSource<any>;
  currentUser: Login;
  parentRoute: string = "";
  permission: number = 0;
  formdata: any = { keyword: '' };
  keyword: any;
  EventType: any = 'Recently Modified';
  ddl_val: any = this.EventType;
  keyworderror: boolean = false;;
  //@ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  can_add: boolean = false;
  can_delete: boolean = false;
  can_view_commission = false;
  can_change_status = false;
  messageTitle: string = 'Agent';
  gridMessage: string = 'No data';
  private onDestroy$: Subject<void> = new Subject<void>();

  dataList: any[];
  columns: any[] = [
    { title: 'Name', dataField: 'CompanyName', type: '' },
    { title: 'Legal First Name', dataField: 'LegalFirstName', type: '' },
    { title: 'Legal Last Name', dataField: 'LegalLastName', type: '' },
    { title: 'Email', dataField: 'Email', type: '' },
    { title: 'Contact Number', dataField: 'PhoneNo', type: '' },
    { title: 'City', dataField: 'City', type: '' },
    { title: 'Province', dataField: 'Province', type: '' },
    { title: 'Country', dataField: 'Country', type: '' },
    { title: 'Status', dataField: 'StatusName', type: '' },
    { title: 'Partner Type', dataField: 'PartnerTypeName', type: ''},
    { title: 'Add Stamp', dataField: 'AddStamp', type: 'date', format: 'dd MMM yyyy' }
  ];
  showFilterRow: boolean = false;
  excel_permisson: number = 0;

  constructor(
    private agentService: MSMAgentService,
    private router: Router,
    private authService: AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) {

    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.Agent);
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);

    this.can_add = this.permission > 1 && this.currentUser.RoleType === 1;
    this.can_delete = this.permission > 2 && this.currentUser.RoleType === 1;
    this.can_view_commission = this.permission > 1 && this.currentUser.RoleType === 1;
    this.can_change_status = this.permission > 1 && this.currentUser.RoleType === 1;
  }

  ngOnInit() {

    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
    if (this.currentUser.UserId > 0) {
      this.parentRoute = "member/"
    }
    this.listAgent(this.EventType);
  }

  listAgent(keyword) {
    this.gridMessage = 'Loading';
    this.agentService.list(keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      res.forEach((v) => {
        v.StatusName = this.getStatusName(v.AgentStatus);
      });
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  getStatusName(statusId: number) {
    if (statusId === 0) {
      return 'Rejected';
    }
    else if (statusId === 1) {
      return 'Approved';
    }
    else if (statusId === -2) {
      return 'In Process';
    }
    else if (statusId === 3) {
      return 'Blacklisted';
    }
    else if (statusId === 4) {
      return 'Blocked';
    }
    else if (statusId === -3) {
      return 'New Registration';
    }
    else {
      return 'Pending';
    }
  }

  delete(instid: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.agentService.delete(instid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success','Agents deleted successfully');
          this.listAgent(this.EventType);
        });
      }
    });


  }

  edit(instid: number) {
    this.router.navigate(['member/agents/edit-agent', instid], {});
  }
  statusUpdate(agentId: number, status: number) {
    this.agentService.statusChange(
      {
        Remark: '',
        StatusId: status,
        ApplicationId: agentId,
        UserId: this.currentUser.UserId
      }
    ).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop('success',this.messageTitle+' status changed successfully')
      this.listAgent('');
    })
  }

  // changeStatus(instid:number)
  // {
  //   this.agentService.statusChange(instid,this.currentUser.UserId).subscribe(res => {
  //     if (res == "OK") {
  //       this.listAgent();
  //     }
  //     else {
  //       alert(res);
  //     }
  //   });
  // }

  showCommission(agentId: number) {
    this.router.navigate(['/member/agents/commission/' + agentId])
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
    });
  }


  changeOption(event: any) {
    this.ddl_val = event;
    this.listAgent(event);
    if (this.keyworderror) { this.keyworderror = false };
  }

  searchByKeyword() {
    if (this.keyword == undefined || this.keyword == '') {
      this.keyworderror = true;
      // this.listAgent("");
    } else {
      this.keyworderror = false;
      this.listAgent(this.keyword);
    }
  }

  onBlurMethod() {
    if (this.keyword == '') {
      this.listAgent(this.ddl_val);
    }
    if (this.keyworderror) { this.keyworderror = false };
  }

  searchByEnter(){
    if (this.keyword == undefined || this.keyword == '') {
      this.keyworderror = true;
    } else {
      this.keyworderror = false;
      this.listAgent(this.keyword);
    }
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Agents', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
