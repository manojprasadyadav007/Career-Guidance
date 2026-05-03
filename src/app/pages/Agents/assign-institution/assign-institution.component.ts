import { Component, OnInit, Input, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AssignNewInstitutionComponent } from './assign-new-institution/assign-new-institution.component';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { AgentInstitutionService } from 'app/services/agent-institution.service';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DxTooltipComponent } from 'devextreme-angular';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-assign-institution',
  templateUrl: './assign-institution.component.html',
  styleUrls: ['./assign-institution.component.scss']
})
export class AssignInstitutionComponent implements OnInit, OnDestroy {
  @ViewChild(DxTooltipComponent, { static: false }) tooltip: DxTooltipComponent
  // columnToDisplay: string[] = ['Institution','Region','Zone','Status' ,'Action'];
  // contactList: MatTableDataSource<any>;
  dataList: any[];
  columns: any[] = [];

  showFilterRow: boolean = false;
  ToolTipText: any = '';
  @Input()
  agentId: number = 0;
  currentUser: Login;
  @Input()
  parentName: '';
  @Input()
  permission: number = 0;

  can_add: boolean = false;
  can_delete: boolean = false;
  gridMessage: string = 'No data';
  messageTitle: string
  @Input() institutionInfo: string;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(
    private matDialog: MatDialog,
    authService: AuthenticationService,
    private agentInstitutionService: AgentInstitutionService,
    private tosterService: ToasterService,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    if (this.currentUser.RoleId === 2 || this.currentUser.RoleType === 2) {
      this.columns = [{ dataField: 'InstName', title: 'Institution', type: '', format: '', width: 100 },
      { dataField: 'AgentCode', title: 'Agent Code', type: '', format: '', width: 50 },
      { dataField: 'Region', title: 'Region', type: '', format: '', width: 50 },
      { dataField: 'Zone', title: 'Zone', type: '', format: '', width: 40 }]
    }
    else {
      this.columns = [{ dataField: 'InstName', title: 'Institution', type: '', format: '', width: 100 },
      { dataField: 'AgentCode', title: 'Agent Code', type: '', format: '', width: 50 },
      { dataField: 'Region', title: 'Region', type: '', format: '', width: 50 },
      { dataField: 'Zone', title: 'Zone', type: '', format: '', width: 40 },
      { dataField: 'Status', title: 'Status', type: '', format: '', width: 40 }];
    }
    this.can_add = this.permission > 1 && this.currentUser.RoleType === 1;
    this.can_delete = this.permission > 2 && this.currentUser.RoleType === 1;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.institutionInfo != '') this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.agentInstitutionService.list(this.agentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  delete(item: any) {
    if (item.Status.toLowerCase() === 'working') {
      this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.agentInstitutionService.delete(item.AgentInstitutionId).subscribe(res => {
            this.tosterService.pop('success', this.messageTitle, 'Institution deleted successfully');
            this.list();

          });
        }
      });
    }
    else {
      this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.agentInstitutionService.blackListDelete({ AgentId: this.agentId, InstitutionId: item.InstitutionId }).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.tosterService.pop('success', this.messageTitle, 'Institution deleted successfully');
            this.list();
          });
        }
      });
    }

  }

  add() {
    this.matDialog.open(AssignNewInstitutionComponent,
      { data: { AgentId: this.agentId }, width: '80%' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.tosterService.pop('success', this.messageTitle, 'Institution saved successfully');
          this.list();
        }
      });
  }

  addBlackList(item: any, status: number) {
    let text = status === 0 ? "Are you sure want to blacklist" : "Are you sure want to block";
    this.matDialog.open(ConfirmBoxComponent, { data: { content: text } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.agentInstitutionService.blackListAdd({ AgentId: this.agentId, InstitutionId: item.InstitutionId, Status: status, AgentCode: item.AgentCode }).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.tosterService.pop('success', this.messageTitle, 'Institution status changed successfully');
          this.list();
        });
      }
    });
  }

  activitylog() {
    this.activityLog.activitylog(this.agentId, this.parentName, 'Institution Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
