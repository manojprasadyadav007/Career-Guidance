import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgentCommissionService } from 'app/services/agent-commission.service';
import { AddCommissionComponent } from '../add-commission/add-commission.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { MSMAgentService } from 'app/services/msmagent.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { ToasterService } from "angular2-toaster";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-commission',
  templateUrl: './show-commission.component.html',
  styleUrls: ['./show-commission.component.scss']
})
export class ShowCommissionComponent implements OnInit, OnDestroy {


  agentId: number;
  //columnToDisplay: string[] = ['Institution', 'Region', 'Program','Intake','Type','Per','Semester','Action'];
  //contactList: MatTableDataSource<any>;
  currentUser: Login;
  permission: number = 0;
  gridMessage: string = 'No data';
  dataList: any[];
  columns: any[] = [];

  showFilterRow: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private agentServiceComm: AgentCommissionService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private agentService: MSMAgentService,
    private subTitleService: SubTitleService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();

    //this.permission = this.authService.checkPermission(sitemap.Commission);

    if (this.currentUser.RoleId === 2) {
      this.agentId = this.currentUser.RefId;
    }else{
      this.permission = this.authService.checkPermission(sitemap.Commission);
    }
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);

  }

  ngOnInit() {
    // if(this.permission <=0)
    // {
    //     this.router.navigate(['/member/unauthorized']);
    //     return;
    // }
    if (this.currentUser.RoleId === 2) {
      // In case of Agent Login, remove the agent column
      this.columns = [
        { title: 'Institution', dataField: 'InstName', type: '' },
        { title: 'Commission', dataField: 'CommissionType', type: '' },
        { title: 'Number of semesters/courses/credits', dataField: 'NoOfSemester', type: 'number' },
        { title: 'Maximum amount of commission', dataField: 'MaximumAmount', type: '' },
        { title: 'Currency', dataField: 'Currency', type: '' },
        { title: 'Impact base', dataField: 'Impact', type: '' },
        
      ];
    } else if (this.currentUser.RoleType === 2) {
      // In case of Institution Login, remove the Institution column
      this.columns = [
        { title: 'Agent', dataField: 'AgentName', type: '' },
        { title: 'Commission', dataField: 'CommissionType', type: '' },
        { title: 'Number of semesters/courses/credits', dataField: 'NoOfSemester', type: 'number' },
        { title: 'Maximum amount of commission', dataField: 'MaximumAmount', type: '' },
        { title: 'Currency', dataField: 'Currency', type: '' },
        { title: 'Impact base', dataField: 'Impact', type: '' },
        ];
    } else {
      this.columns = [
        { title: 'Institution', dataField: 'InstName', type: '' },
        { title: 'Agent', dataField: 'AgentName', type: '' },
        { title: 'Commission', dataField: 'CommissionType', type: '' },
        { title: 'Number of semesters/courses/credits', dataField: 'NoOfSemester', type: 'number' },
        { title: 'Maximum amount of commission', dataField: 'MaximumAmount', type: '' },
        { title: 'Currency', dataField: 'Currency', type: '' },
        { title: 'Impact base', dataField: 'Impact', type: '' },    
      ];
    }


    if (this.currentUser.RoleId != 2) {
      this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
        this.agentId = +param.get("id") | this.agentId;

        this.agentService.getName(this.agentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.subTitleService.name.next(res);
        });

        this.listContact();
      });
    }
    else {
      this.listContact();
    }
  }

  listContact() {
    this.gridMessage = 'Loading';
    this.agentServiceComm.list(this.agentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      //this.contactList = new MatTableDataSource(res);
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  delete(contactid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.agentServiceComm.delete(contactid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Commission deleted successfully");
          this.listContact();
        });
      }
    });
  }

  edit(CommissionId: number) {
    if (this.agentId) {
      return;
    }
    if (CommissionId != undefined) {
      this.matDialog.open(AddCommissionComponent,
        { data: { agentId: this.agentId, CommissionId: CommissionId, permission: this.permission }, width: '80%', minWidth: '400px' })
        .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            if (CommissionId) {
              this.toasterService.pop("success","Commission updated successfully");
            } else {
              this.toasterService.pop("success","Commission saved successfully");
            }
            this.listContact();
          }
        });
    }

  }

  activitylog(){
    this.activityLog.activitylog(0, 'Commission', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {

    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
