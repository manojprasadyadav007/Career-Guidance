import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Login } from 'app/models/login.model';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddInstitutionIntakeComponent } from './add-institution-intake/add-institution-intake.component';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-institution-intake',
  templateUrl: './institution-intake.component.html',
  styleUrls: ['./institution-intake.component.scss']
})
export class InstitutionIntakeComponent implements OnInit , OnDestroy {

  @Input()
  InstitutionId: number;

  @Input()
  parentName: '';

  @Input()
  instituteIntakeInfo:'';

  currentUser: Login;

  permission: number = 0;

  dataList: any[];
  columns: any[] = [
    {
      dataField: 'Region',
      title: 'Region',
      type: '',
      format: ''
    },
    {
      dataField: 'IntakeName',
      title: 'Name',
      type: '',
      format: ''
    },
    {
      dataField: 'IntekDate',
      title: 'Date',
      type: 'date',
      format: 'dd MMM yyyy'
    },
    {
      dataField: 'IntekStatus',
      title: 'Status',
      type: '',
      format: ''
    },
    {
      dataField: 'OnshoreSubmissionDeadline',
      title: 'OnShore Deadline',
      type: 'date',
      format: 'dd MMM yyyy'
    },   
    {
      dataField: 'SubmissionDeadline',
      title: 'OffShore Deadline',
      type: 'date',
      format: 'dd MMM yyyy'
    },

    {
      dataField: 'NoOfProgram',
      title: 'No Of Program',
      type: 'number',
      format: ''
    },

  ];
  gridMessage: string = 'No data';
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private institutionIntakeService: InstitutionIntakeService,
    private matDialog: MatDialog,
    private authService: AuthenticationService,
    private toasterService:ToasterService,
    private activityLog: ActivityLogService,) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
   
  }

  ngOnInit() {
    if(this.currentUser.RoleType === 2) {
      this.InstitutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Intakes);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }
    this.list();
  }

  add(IntakeGroupId?: number) {
    this.matDialog.open(AddInstitutionIntakeComponent, {
      data: {
        IntakeGroupId: IntakeGroupId, InstitutionId: this.InstitutionId,permission:this.permission
      } 
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }

  delete(IntakeGroupId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.institutionIntakeService.delete(IntakeGroupId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success',"Intake"+' '+res.toString());
          this.list();
        });
      }
    });
  }

  list() {
    this.gridMessage = 'Loading';
    this.institutionIntakeService.list(this.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.InstitutionId, this.parentName, 'Intake Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.instituteIntakeInfo !='') this.list(); 
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
