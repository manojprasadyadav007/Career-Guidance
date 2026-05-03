import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
import { AgentBranchService } from 'app/services/agent-branch.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddBranchComponent } from '../add-branch/add-branch.component';

@Component({
  selector: 'app-show-branch',
  templateUrl: './show-branch.component.html',
  styleUrls: ['./show-branch.component.scss']
})
export class ShowBranchComponent implements OnInit,OnDestroy {
  
  @Input()
  agentId: number = 0;
  
  @Input()
  parentName: '';

  @Input()
  branchInfo: '';

  currentUser: Login;

  @Input()
  permission:number=0;
  dataList: any[];
  columns: any[] = [
    
    {
      dataField: 'BranchName',
      title: 'Branch Name',
      type: '',
      format: ''
    },
    {
      dataField: 'BranchAddress',
      title: 'Address',
      type: '',
      format: ''
    },
    {
      dataField: 'City',
      title: 'City',
      type: '',
      format: ''
    },
    {
      dataField: 'ProvinceName',
      title: 'Province',
      type: '',
      format: ''
    },
    {
      dataField: 'CountryName',
      title: 'Country',
      type: '',
      format: ''
    },
    {
      dataField: 'BranchEmail',
      title: 'Email',
      type: '',
      format: ''
    },

    {
      dataField: 'BranchPhone',
      title: 'Contact Number',
      type: '',
      format: ''
    },
   

    {
      dataField: 'ContactPersonName',
      title: 'Contact Person Name',
      type: '',
      format: ''
    },

    {
      dataField: 'ContactPersonEmailId',
      title: 'Email',
      type: '',
      format: ''
    },

    {
      dataField: 'ContactPersonPhone',
      title: 'Contact Number',
      type: '',
      format: ''
    },


  ];

  //currentUser: Login;

 // permission: number = 0;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  showFilterRow:boolean=false;
  constructor(private authService: AuthenticationService,
    //private documentService: AgentDocumentService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private agentBranchService : AgentBranchService,
    private miscService: MiscService,
    private dialogRef: MatDialogRef<AddBranchComponent>,
    private activityLog: ActivityLogService) { 
    this.currentUser = this.authService.currentUserSubject.getValue();

  }

  ngOnInit() {
      this.permission = this.authService.checkPermission(sitemap.Agent_Document);
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    
    this.list();
  }

  add(branchId?: number) {
    this.matDialog.open(AddBranchComponent, {
      data: {
        agentId: this.agentId,permission:this.permission,branchId : branchId
      } 
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  } 
  list() {
    this.agentBranchService.list(this.agentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
    });
  }

  delete(branchId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.agentBranchService.delete(branchId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success","Branch deleted successfully");
            this.list();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.agentId, this.parentName, 'Branch Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.branchInfo !='') this.list(); 
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
