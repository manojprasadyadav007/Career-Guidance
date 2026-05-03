import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MSMAgentService } from 'app/services/msmagent.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { AssignNewAgentComponent } from '../assign-new-agent/assign-new-agent.component';
import { UserService } from 'app/services/user.service';
import { UserAgentService } from 'app/services/user-agent.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-assigned-agent',
  templateUrl: './assigned-agent.component.html',
  styleUrls: ['./assigned-agent.component.scss']
})
export class AssignedAgentComponent implements OnInit,OnDestroy {

  currentUser: Login;
  parentRoute: string = "";
  permission: number = 0;
  formdata: any = { keyword: '' };
  keyword: any;
  EventType: any = 'Recently Modified';
  ddl_val: any = this.EventType;
  userList: any[];
  keyworderror: boolean = false;;
  //@ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  can_add: boolean = false;
  can_delete: boolean = false;
  can_view_commission = false;
  can_change_status = false;
  UserId: any;
  messageTitle: string = 'Agent';
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input()
  agentId: number = 0;
  select_user: boolean = true;
  userFilter: any;
  dataList: any[];
  columns: any[] = [
    { title: 'Name', dataField: 'CompanyName', type: '' },
    { title: 'Legal First Name', dataField: 'LegalFirstName', type: '' },
    { title: 'Email', dataField: 'Email', type: '' },
    { title: 'City', dataField: 'City', type: '' },
    { title: 'Province', dataField: 'Province', type: '' },
    { title: 'Country', dataField: 'Country', type: '' },
    { title: 'Status', dataField: 'StatusName', type: '' }
    ];
  showFilterRow: boolean = false;
  excel_permisson: number = 0;
  gridMessage: string = 'No data';
  constructor(
    private agentService: MSMAgentService,
    private router: Router,
    private useragentService: UserAgentService,
    private userService: UserService,
    private authService: AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) {

    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.User_Agent_Assignment);
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

    this.listUser();
  }

  listAgent(keyword) {
    this.gridMessage = 'Loading';
    this.useragentService.getAgentByUserId(keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      res.forEach((v) => {
        v.StatusName = this.getStatusName(v.AgentStatus);
      });
      this.dataList = res;
     this.gridMessage = 'No data';
    });
  }



  listUser() {
    this.userService.MarketingManagerForDDL().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.userList = res;
    });
  }

  add() {
    this.matDialog.open(AssignNewAgentComponent,
      { data: { UserId: this.ddl_val, Permission: this.permission }, width: '80%' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.listAgent(this.ddl_val);
        if (res) {
          this.toasterService.pop('success',this.messageTitle+' saved successfully');
        }
      });
  }



  onDelete(data) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.useragentService.deleteassignAgent(this.ddl_val, data.AgentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success","Assigned agent deleted successfully");
          this.listAgent(this.ddl_val);
        });
      }
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

  activitylog(){
    this.activityLog.activitylog(0, 'Assign Agent', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
    });
  }


  changeOption(event: any) {
    this.select_user = false;;
    this.ddl_val = event;
    this.listAgent(event);
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
